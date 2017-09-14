/**
 * Imports
 */
import React from 'react';
import {FormattedMessage, FormattedNumber} from 'react-intl';
import {Link} from 'react-router';
import connectToStores from 'fluxible-addons-react/connectToStores';
import {slugify} from '../../../utils/strings';

// Flux
import CartStore from '../../../stores/Cart/CartStore';
import addToCart from '../../../actions/Cart/addToCart';
import IntlStore from '../../../stores/Application/IntlStore';
import intlData from '../../pages/Products/ProductPage.intl';
import triggerDrawer from '../../../actions/Application/triggerDrawer';

// Required components
import Text from '../typography/Text';
import QuantitySelector from '../../common/forms/QuantitySelector';
import Button from '../../common/buttons/Button';

/**
 * Component
 */
class ProductListItem extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired,
        executeAction: React.PropTypes.func.isRequired,
    };

    //*** Initial State ***//

    state = {
        productPlaceholderImage: undefined,
        quantity:1,
        cartLoading: this.context.getStore(CartStore).isLoading(),
        cartProducts: this.context.getStore(CartStore).getProducts(),
        addingToCart: false,
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./ProductListItem.scss');

        // Load static files
        this.setState({
            productPlaceholderImage: require('../images/image_placeholder.png')
        });
    }

    componentWillReceiveProps(nextProps) {
        // Check for cart changes when we flagged that we were adding to cart
        if (this.state.addingToCart && this.state.cartLoading && !nextProps._cartLoading) {
            this.setState({
                addingToCart: false,
                quantity: 1
            });
            this.context.executeAction(triggerDrawer, 'cart');
        }

        this.setState({
            cartLoading: nextProps._cartLoading,
            cartProducts: nextProps._cartProducts
        });
    }

    getQuantityInCart = () => {
        let quantity = 0;
        if (this.props._product) {
            this.state._cartProducts.filter((product) => {
                return product.id === this.props._product.id;
            }).forEach(function (product) {
                quantity += product.quantity;
            });
        }
        return quantity;
    };

    handleAddToCartClick = () => {
        let payload = Object.assign({details: this.props.product}, {
            id: this.props.product.id,
            quantity: this.getQuantityInCart() + this.state.quantity
        });
        this.setState({addingToCart: true});
        this.context.executeAction(addToCart, payload);
      }

    handleQuantityChange = (value) => {
        this.setState({quantity: value});
    };

    render() {

        //
        // Helper methods & variables
        //

        let intlStore = this.context.getStore(IntlStore);

        let productDescription = () => {
          if (this.props.product.name.es == 'Cajón Chico') {
            return (
               <div className="groups-page__description">
                   <div className="groups-table">
                       <table className="groups-table__table">
                           <thead>
                               <tr className="groups-table__row">
                                 <th className="groups-table__heading">
                                     <Text weight="bold" size="medium">Productos</Text>
                                 </th>
                                 <th className="groups-table__heading">
                                     <Text weight="bold" size="medium">Cantidad</Text>
                                 </th>
                               </tr>
                           </thead>
                           <tbody className="groups-table__body">
                             <tr className="groups-table__row">
                               <td className="groups-table__data"><Text size="medium">Tomate Perita</Text></td>
                               <td className="groups-table__data"><Text size="medium">500 grs.</Text></td>
                             </tr>
                             <tr className="groups-table__row">
                               <td className="groups-table__data"><Text size="medium">Zanahoria</Text></td>
                               <td className="groups-table__data"><Text size="medium">500 grs.</Text></td>
                             </tr>
                             <tr className="groups-table__row">
                               <td className="groups-table__data"><Text size="medium">Cebolla</Text></td>
                               <td className="groups-table__data"><Text size="medium">500 grs.</Text></td>
                             </tr>
                             <tr className="groups-table__row">
                               <td className="groups-table__data"><Text size="medium">Batata</Text></td>
                               <td className="groups-table__data"><Text size="medium">500 grs.</Text></td>
                             </tr>
                             <tr className="groups-table__row">
                               <td className="groups-table__data"><Text size="medium">Papa</Text></td>
                               <td className="groups-table__data"><Text size="medium">500 grs.</Text></td>
                             </tr>
                             <tr className="groups-table__row">
                               <td className="groups-table__data"><Text size="medium">Zapallo Brasilero</Text></td>
                               <td className="groups-table__data"><Text size="medium">1/2 uni(500 grs)</Text></td>
                             </tr>
                             <tr className="groups-table__row">
                               <td className="groups-table__data"><Text size="medium">Limones</Text></td>
                               <td className="groups-table__data"><Text size="medium">1 unidades</Text></td>
                             </tr>
                             <tr className="groups-table__row">
                               <td className="groups-table__data"><Text size="medium">Huevos</Text></td>
                               <td className="groups-table__data"><Text size="medium">3 unidades</Text></td>
                             </tr>
                             <tr className="groups-table__row">
                               <td className="groups-table__data"><Text size="medium">Morrón Verde</Text></td>
                               <td className="groups-table__data"><Text size="medium">200 grs.</Text></td>
                             </tr>
                             <tr className="groups-table__row">
                               <td className="groups-table__data"><Text size="medium">Banana</Text></td>
                               <td className="groups-table__data"><Text size="medium">500 grs.</Text></td>
                             </tr>
                             <tr className="groups-table__row">
                               <td className="groups-table__data"><Text size="medium">Manzana</Text></td>
                               <td className="groups-table__data"><Text size="medium">400 grs.</Text></td>
                             </tr>
                             <tr className="groups-table__row">
                               <td className="groups-table__data"><Text size="medium">Zapallito Verde</Text></td>
                               <td className="groups-table__data"><Text size="medium">400 grs.</Text></td>
                             </tr>
                             <tr className="groups-table__row">
                               <td className="groups-table__data"><Text size="medium">Cebollita de V.</Text></td>
                               <td className="groups-table__data"><Text size="medium">1 atado</Text></td>
                             </tr>
                             <tr className="groups-table__row">
                               <td className="groups-table__data"><Text size="medium">Naranja</Text></td>
                               <td className="groups-table__data"><Text size="medium">500 grs.</Text></td>
                             </tr>
                             <tr className="groups-table__row">
                               <td className="groups-table__data"><Text size="medium">Lechuga Romana</Text></td>
                               <td className="groups-table__data"><Text size="medium">1 atado</Text></td>
                             </tr>
                           </tbody>
                       </table>
                   </div>
               </div>
             );
          } else if (this.props.product.name.es == 'Cajón Mediano') {
            return (
               <div className="groups-page__description">
                   <div className="groups-table">
                       <table className="groups-table__table">
                           <thead>
                               <tr className="groups-table__row">
                                 <th className="groups-table__heading">
                                     <Text weight="bold" size="medium">Productos</Text>
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
                               <td className="groups-table__data"><Text size="medium">1 unidad(1 kg)</Text></td>
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
                               <td className="groups-table__data"><Text size="medium">Morrón Verde</Text></td>
                               <td className="groups-table__data"><Text size="medium">400 grs.</Text></td>
                             </tr>
                             <tr className="groups-table__row">
                               <td className="groups-table__data"><Text size="medium">Banana</Text></td>
                               <td className="groups-table__data"><Text size="medium">1 Kg.</Text></td>
                             </tr>
                             <tr className="groups-table__row">
                               <td className="groups-table__data"><Text size="medium">Manzana</Text></td>
                               <td className="groups-table__data"><Text size="medium">750 grs.</Text></td>
                             </tr>
                             <tr className="groups-table__row">
                               <td className="groups-table__data"><Text size="medium">Zapallito Verde</Text></td>
                               <td className="groups-table__data"><Text size="medium">800 grs.</Text></td>
                             </tr>
                             <tr className="groups-table__row">
                               <td className="groups-table__data"><Text size="medium">Cebollita de V.</Text></td>
                               <td className="groups-table__data"><Text size="medium">2 atados</Text></td>
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
             );
          } else if (this.props.product.name.es == 'Cajón Grande') {
            return (
               <div className="groups-page__description">
                   <div className="groups-table">
                       <table className="groups-table__table">
                           <thead>
                               <tr className="groups-table__row">
                                 <th className="groups-table__heading">
                                     <Text weight="bold" size="medium">Productos</Text>
                                 </th>
                                 <th className="groups-table__heading">
                                     <Text weight="bold" size="medium">Cantidad</Text>
                                 </th>
                               </tr>
                           </thead>
                           <tbody className="groups-table__body">
                             <tr className="groups-table__row">
                               <td className="groups-table__data"><Text size="medium">Tomate Perita</Text></td>
                               <td className="groups-table__data"><Text size="medium">1.2 kg.</Text></td>
                             </tr>
                             <tr className="groups-table__row">
                               <td className="groups-table__data"><Text size="medium">Zanahoria</Text></td>
                               <td className="groups-table__data"><Text size="medium">1.2 kg.</Text></td>
                             </tr>
                             <tr className="groups-table__row">
                               <td className="groups-table__data"><Text size="medium">Cebolla</Text></td>
                               <td className="groups-table__data"><Text size="medium">1.2 kg.</Text></td>
                             </tr>
                             <tr className="groups-table__row">
                               <td className="groups-table__data"><Text size="medium">Batata</Text></td>
                               <td className="groups-table__data"><Text size="medium">1.2 kg.</Text></td>
                             </tr>
                             <tr className="groups-table__row">
                               <td className="groups-table__data"><Text size="medium">Papa</Text></td>
                               <td className="groups-table__data"><Text size="medium">1.2 kg.</Text></td>
                             </tr>
                             <tr className="groups-table__row">
                               <td className="groups-table__data"><Text size="medium">Zapallo Brasilero</Text></td>
                               <td className="groups-table__data"><Text size="medium">1 unidad(1.5 kg)</Text></td>
                             </tr>
                             <tr className="groups-table__row">
                               <td className="groups-table__data"><Text size="medium">Limones</Text></td>
                               <td className="groups-table__data"><Text size="medium">3 unidades</Text></td>
                             </tr>
                             <tr className="groups-table__row">
                               <td className="groups-table__data"><Text size="medium">Huevos</Text></td>
                               <td className="groups-table__data"><Text size="medium">8 unidades</Text></td>
                             </tr>
                             <tr className="groups-table__row">
                               <td className="groups-table__data"><Text size="medium">Morrón Verde</Text></td>
                               <td className="groups-table__data"><Text size="medium">800 grs.</Text></td>
                             </tr>
                             <tr className="groups-table__row">
                               <td className="groups-table__data"><Text size="medium">Banana</Text></td>
                               <td className="groups-table__data"><Text size="medium">1,5 kgs.</Text></td>
                             </tr>
                             <tr className="groups-table__row">
                               <td className="groups-table__data"><Text size="medium">Manzana</Text></td>
                               <td className="groups-table__data"><Text size="medium">1 kg.</Text></td>
                             </tr>
                             <tr className="groups-table__row">
                               <td className="groups-table__data"><Text size="medium">Zapallito Verde</Text></td>
                               <td className="groups-table__data"><Text size="medium">1 kg.</Text></td>
                             </tr>
                             <tr className="groups-table__row">
                               <td className="groups-table__data"><Text size="medium">Cebollita de V.</Text></td>
                               <td className="groups-table__data"><Text size="medium">3 atados</Text></td>
                             </tr>
                             <tr className="groups-table__row">
                               <td className="groups-table__data"><Text size="medium">Naranja</Text></td>
                               <td className="groups-table__data"><Text size="medium">1.5 kg.</Text></td>
                             </tr>
                             <tr className="groups-table__row">
                               <td className="groups-table__data"><Text size="medium">Lechuga Romana</Text></td>
                               <td className="groups-table__data"><Text size="medium">3 atados</Text></td>
                             </tr>
                           </tbody>
                       </table>
                   </div>
               </div>
             );
          }
        }

        return (
            <div className="product-list-item" itemScope itemType="http://schema.org/Product">
                <div className="product-list-item__name" itemProp="name">
                    <Text size="large" weight="bold">
                        <FormattedMessage
                            message={intlStore.getMessage(this.props.product.name)}
                            locales={intlStore.getCurrentLocale()} />
                    </Text>
                    <span style={{display: 'none'}} itemProp="sku">{this.props.product.sku}</span>
                </div>
                <div className="product-list-item__image">
                    {this.props.product.images && this.props.product.images.length > 0 ?
                        <span style={{display: 'none'}} itemProp="image">
                            {`//${this.props.product.images[0].url}`}
                        </span>
                        :
                        null
                    }
                    {this.props.product.images && this.props.product.images.length > 0 ?
                        <img src={`//${this.props.product.images[0].url}`} />
                        :
                        <img src={this.state.productPlaceholderImage} />
                    }
                </div>

                {this.props.product.tags.includes('cajon') ?
                <div className="product-list-item__name" itemProp="description">
                    {productDescription()}
                </div>
                :
                null
                }

                {this.props.product.pricing ?
                    <div className="product-list-item__price" itemProp="offers" itemScope itemType="http://schema.org/Offer">
                        <div style={{display: 'none'}} itemProp="price">
                            {this.props.product.pricing.retail}
                        </div>
                        <div style={{display: 'none'}} itemProp="priceCurrency">
                            {this.props.product.pricing.currency}
                        </div>
                        <div>
                            <Text size="medium" weight="bold">
                                $ <FormattedNumber value={this.props.product.pricing.retail} />
                            </Text>
                        </div>
                    </div>
                    :
                    null
                }
                <div className="product-page__quantity">
                    <Text size="medium" weight="bold">
                       <FormattedMessage message={intlStore.getMessage(intlData, 'quantity')}
                                      locales={intlStore.getCurrentLocale()} />
                    </Text>
                    <QuantitySelector value={this.state.quantity}
                                      onChange={this.handleQuantityChange} />
                </div>
                <div className="product-page__add">
                    <div className="product-page__add-buttons">
                        {this.props.product.stock > 0 ?
                            <Button type="primary"
                                    onClick={this.handleAddToCartClick}
                                    disabled={this.props.quantity <= 0 || this.state.cartLoading}>
                                <FormattedMessage
                                    message={intlStore.getMessage(intlData, 'addToCart')}
                                    locales={intlStore.getCurrentLocale()} />
                            </Button>
                            :
                            <Button type="primary" disabled={true}>
                                <FormattedMessage
                                    message={intlStore.getMessage(intlData, 'outOfStock')}
                                    locales={intlStore.getCurrentLocale()} />
                            </Button>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

ProductListItem = connectToStores(ProductListItem, [CartStore], (context) => {
    return {
        _cartLoading: context.getStore(CartStore).isLoading(),
        _cartProducts: context.getStore(CartStore).getProducts()
    };
});

export default ProductListItem;
