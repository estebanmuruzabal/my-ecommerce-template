/**
 * Imports
 */
import React from 'react';
import async from 'async';
import connectToStores from 'fluxible-addons-react/connectToStores';
import {FormattedMessage, FormattedNumber} from 'react-intl';

import {slugify} from '../../../utils/strings';

// Flux
import CartStore from '../../../stores/Cart/CartStore';
import CollectionsStore from '../../../stores/Collections/CollectionsStore';
import IntlStore from '../../../stores/Application/IntlStore';
import ProductContentsStore from '../../../stores/Products/ProductContentsStore';
import ProductDetailsStore from '../../../stores/Products/ProductDetailsStore';
import ProductSuggestionsStore from '../../../stores/Products/ProductSuggestionsStore';

import addToCart from '../../../actions/Cart/addToCart';
import clearSuggestionsList from '../../../actions/Products/clearSuggestionsList';
import fetchProductContent from '../../../actions/Products/fetchProductContent';
import fetchProductSuggestions from '../../../actions/Products/fetchProductSuggestions';
import fetchProductAndCheckIfFound from '../../../actions/Products/fetchProductAndCheckIfFound';
import updateProduct from '../../../actions/Admin/updateProduct';
import triggerDrawer from '../../../actions/Application/triggerDrawer';

// Required components
import ArticleSummary from '../../common/articles/ArticleSummary';
import Breadcrumbs from '../../common/navigation/Breadcrumbs';
import Button from '../../common/buttons/Button';
import Heading from '../../common/typography/Heading';
import Table from '../../common/tables/Table';
import ImageGallery from '../../common/images/ImageGallery';
import NotFound from '../../pages/NotFound/NotFound';
import InputField from '../../common/forms/InputField';
import ProductSuggestions from '../../common/products/ProductSuggestions';
import QuantitySelector from '../../common/forms/QuantitySelector';
import ToggleSwitch from '../../common/buttons/ToggleSwitch';
import Select from '../../common/forms/Select';
import Textarea from '../../common/forms/Textarea';
import Text from '../../common/typography/Text';

// Translation data for this component
import intlData from './VerdurasProduct.intl';

/**
 * Component
 */
class VerdurasProduct extends React.Component {

    static contextTypes = {
        executeAction: React.PropTypes.func.isRequired,
        getStore: React.PropTypes.func.isRequired
    };



    //*** Helper Methods ***//

    getQuantityInCart = () => {
        let quantity = 0;
        if (this.props._product) {
            this.props._cartProducts.filter((product) => {
                return product.id === this.props._product.id;
            }).forEach(function (product) {
                quantity += product.quantity;
            });
        }
        return quantity;
    };

    //*** Initial State ***//

    state = {
        cartLoading: this.context.getStore(CartStore).isLoading(),
        cartProducts: this.context.getStore(CartStore).getProducts(),
        product: this.context.getStore(ProductDetailsStore).getProduct(),
        contents: this.context.getStore(ProductContentsStore).getContents(),
        addingToCart: false,
        placeholderImage: undefined,
        quantity: 1,
        fieldErrors: {}
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./VerdurasProduct.scss');

        this.context.executeAction(fetchProductAndCheckIfFound, this.props.productId);
        // Load static files
        this.setState({
            placeholderImage: require('../../common/images/image_placeholder.png')
        });

        // If product has main collection, trigger fetching of cross-sell products
        if (this.state.product && this.state.product.metadata && this.state.product.metadata.mainCollection) {
            this.context.executeAction(fetchProductSuggestions, this.state.product);
        } else {
            this.context.executeAction(clearSuggestionsList);
        }

    }

    componentWillReceiveProps(nextProps) {

        // --------------------- THIS IS VERY USEFUL TO READ! ---------------------
        // If product changed (because component is being "re-used") act accordingly
        // ------------------------------------------------------------------------
        if (this.state.product && nextProps._product && this.state.product.id !== nextProps._product.id) {

            // Reset quantity
            this.setState({quantity: 1});

            // If product has main collection, trigger fetching of cross-sell products
            if (nextProps._product && nextProps._product.metadata && nextProps._product.metadata.mainCollection) {
                this.context.executeAction(fetchProductSuggestions, nextProps._product);
            } else {
                this.context.executeAction(clearSuggestionsList);
            }
        }

        // Check for cart changes when we flagged that we were adding to cart
        if (this.state.addingToCart && this.state.cartLoading && !nextProps._cartLoading) {
            this.setState({
                addingToCart: false,
                quantity: 1
            });
            this.context.executeAction(triggerDrawer, 'cart');
        }

        let fieldErrors = {};
        if (nextProps._error && nextProps._error.validation && nextProps._error.validation.keys) {
            nextProps._error.validation.keys.forEach(function (field) {
                if (field === 'comments') {
                    fieldErrors['comments'] = nextProps._error.validation.details[field];
                } else {
                    fieldErrors[field] = nextProps._error.validation.details[field];
                }
            });
        }


        this.setState({
            cartLoading: nextProps._cartLoading,
            cartProducts: nextProps._cartProducts,
            product: nextProps._product,
            contents: nextProps._contents,
            fieldErrors: fieldErrors
        });
    }

    //*** View Controllers ***//

    handleAddToCartClick = () => {
        let payload = Object.assign({details: this.state.product}, {
            id: this.state.product.id,
            quantity: this.getQuantityInCart() + this.state.quantity
        });
        this.setState({addingToCart: true});
        this.context.executeAction(addToCart, payload);
    };

    handleQuantityChange = (value) => {
        this.setState({quantity: value});
    };

    //*** Template ***//

    render() {

        let intlStore = this.context.getStore(IntlStore);
        let routeParams = {locale: intlStore.getCurrentLocale()}; // Base route params

        // Breadcrumbs
        let breadcrumbs = [
            {
                name: <FormattedMessage
                          message={intlStore.getMessage(intlData, 'homepage')}
                          locales={intlStore.getCurrentLocale()} />,
                to: 'homepage',
                params: routeParams
            },
            {
                name: <FormattedMessage
                    message={intlStore.getMessage(intlData, 'productsList')}
                    locales={intlStore.getCurrentLocale()} />,
                to: 'products',
                params: routeParams
            }
        ];

        let addCollectionToBreadcrumbs = (collectionId) => {
            let collection = this.context.getStore(CollectionsStore).getCollection(collectionId);
            if (collection) {
                breadcrumbs.push({
                    name: <FormattedMessage
                              message={intlStore.getMessage(collection.name)}
                              locales={intlStore.getCurrentLocale()} />,
                    to: 'collection-slug',
                    params: Object.assign({
                        collectionId: collection.id,
                        collectionSlug: slugify(intlStore.getMessage(collection.name))
                    }, routeParams)
                });
            }
        };

        // Stuff that only makes sense (and will crash otherwise) if product exists
        if (this.state.product) {

            // Look for Main Category
            if (this.state.product.metadata && this.state.product.metadata.mainCategory) {
                addCollectionToBreadcrumbs(this.state.product.metadata.mainCategory);
            }

            // Look for Main Collection
            if (this.state.product.metadata && this.state.product.metadata.mainCollection) {
                addCollectionToBreadcrumbs(this.state.product.metadata.mainCollection);
            }
        }

        return (
            <div className="product-page">
                {!this.state.product ?
                    <NotFound />
                    :
                    <div>
                        <div className="product-page__product" itemScope itemType="http://schema.org/Product">

                            <div className="product-page__details">
                                <div className="product-page__name" itemProp="name">
                                    <Heading size="large">
                                        <FormattedMessage
                                            message={intlStore.getMessage(this.state.product.name)}
                                            locales={intlStore.getCurrentLocale()} />
                                    </Heading>
                                </div>
                                {this.state.product.pricing ?
                                    <div className="product-page__price" itemProp="offers" itemScope itemType="http://schema.org/Offer">
                                        <div style={{display: 'none'}} itemProp="price">
                                            {this.state.product.pricing.retail}
                                        </div>
                                        <div style={{display: 'none'}} itemProp="priceCurrency">
                                            {this.state.product.pricing.currency}
                                        </div>
                                        <div>
                                            <Text size="medium" weight="bold">
                                                Precio : $<FormattedNumber value={this.state.product.pricing.retail} />
                                            </Text>
                                        </div>
                                    </div>
                                    :
                                    null
                                }
                                <div className="product-page__sku">
                                    <Text size="small">
                                        Ref: <span itemProp="sku">{this.state.product.sku}</span>
                                    </Text>
                                </div>
                                <div className="groups-page__description">
                                    <div className="groups-table">
                                        <table className="groups-table__table">
                                            <thead>
                                                <tr className="groups-table__row">
                                                  <th className="groups-table__heading">
                                                      <Text weight="bold" size="medium">Lista del box</Text>
                                                  </th>
                                                  <th className="groups-table__heading">
                                                      <Text weight="bold" size="medium">Cantidad</Text>
                                                  </th>
                                                </tr>
                                            </thead>
                                            <tbody className="groups-table__body">
                                              <tr className="groups-table__row">
                                                <td className="groups-table__data"><Text size="medium">Tomate Perita</Text></td>
                                                <td className="groups-table__data"><Text size="medium">1 kg.</Text></td>
                                              </tr>
                                              <tr className="groups-table__row">
                                                <td className="groups-table__data"><Text size="medium">Zanahoria</Text></td>
                                                <td className="groups-table__data"><Text size="medium">1 kg.</Text></td>
                                              </tr>
                                              <tr className="groups-table__row">
                                                <td className="groups-table__data"><Text size="medium">Cebolla</Text></td>
                                                <td className="groups-table__data"><Text size="medium">1 kg.</Text></td>
                                              </tr>
                                              <tr className="groups-table__row">
                                                <td className="groups-table__data"><Text size="medium">Batata</Text></td>
                                                <td className="groups-table__data"><Text size="medium">1 kg.</Text></td>
                                              </tr>
                                              <tr className="groups-table__row">
                                                <td className="groups-table__data"><Text size="medium">Papa</Text></td>
                                                <td className="groups-table__data"><Text size="medium">1 kg.</Text></td>
                                              </tr>
                                              <tr className="groups-table__row">
                                                <td className="groups-table__data"><Text size="medium">Zapallo Brasilero</Text></td>
                                                <td className="groups-table__data"><Text size="medium">1 unidad(1.5kg)</Text></td>
                                              </tr>
                                              <tr className="groups-table__row">
                                                <td className="groups-table__data"><Text size="medium">Limones</Text></td>
                                                <td className="groups-table__data"><Text size="medium">2 unidades</Text></td>
                                              </tr>
                                              <tr className="groups-table__row">
                                                <td className="groups-table__data"><Text size="medium">Huevos</Text></td>
                                                <td className="groups-table__data"><Text size="medium">6 unidades</Text></td>
                                              </tr>
                                              <tr className="groups-table__row">
                                                <td className="groups-table__data"><Text size="medium">Morrón</Text></td>
                                                <td className="groups-table__data"><Text size="medium">800 grs.</Text></td>
                                              </tr>
                                              <tr className="groups-table__row">
                                                <td className="groups-table__data"><Text size="medium">Banana</Text></td>
                                                <td className="groups-table__data"><Text size="medium">1 Kg.</Text></td>
                                              </tr>
                                              <tr className="groups-table__row">
                                                <td className="groups-table__data"><Text size="medium">Manzana</Text></td>
                                                <td className="groups-table__data"><Text size="medium">1 kg.</Text></td>
                                              </tr>
                                              <tr className="groups-table__row">
                                                <td className="groups-table__data"><Text size="medium">Zapallito</Text></td>
                                                <td className="groups-table__data"><Text size="medium">1 kg.</Text></td>
                                              </tr>
                                              <tr className="groups-table__row">
                                                <td className="groups-table__data"><Text size="medium">Cebollita de V.</Text></td>
                                                <td className="groups-table__data"><Text size="medium">1 atado</Text></td>
                                              </tr>
                                              <tr className="groups-table__row">
                                                <td className="groups-table__data"><Text size="medium">Naranja</Text></td>
                                                <td className="groups-table__data"><Text size="medium">1 kg.</Text></td>
                                              </tr>
                                              <tr className="groups-table__row">
                                                <td className="groups-table__data"><Text size="medium">Lechuga Romana</Text></td>
                                                <td className="groups-table__data"><Text size="medium">1 atado</Text></td>
                                              </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                              </div>
                            <div className="product-page__gallery-container">
                                {this.state.product.images && this.state.product.images.length > 0 ?
                                    <div className="product-page__gallery">
                                        <span style={{display: 'none'}} itemProp="image">
                                            {`//${this.state.product.images[0].url}`}
                                        </span>
                                        <ImageGallery key={this.state.product.id} images={this.state.product.images} />
                                    </div>
                                    :
                                    <div className="product-page__gallery">
                                        <img src={this.state.placeholderImage} />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

/**
 * Flux
 */
VerdurasProduct = connectToStores(VerdurasProduct, [CartStore, ProductContentsStore, ProductDetailsStore, ProductSuggestionsStore], (context) => {
    return {
        _cartLoading: context.getStore(CartStore).isLoading(),
        _cartProducts: context.getStore(CartStore).getProducts(),
        _product: context.getStore(ProductDetailsStore).getProduct(),
        _contents: context.getStore(ProductContentsStore).getContents(),
    };
});

/**
 * Exports
 */
export default VerdurasProduct;
