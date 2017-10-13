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
import IntlStore from '../../../stores/Application/IntlStore';
import intlData from '../../pages/Products/ProductPage.intl';
import GroupGrandeAddStore from '../../../stores/GroupGrande/GroupGrandeAddStore';
import GroupGrandeDetailsStore from '../../../stores/GroupGrande/GroupGrandeDetailsStore';
import AccountStore from '../../../stores/Account/AccountStore';

// actions
import addGroupGrande from '../../../actions/GroupGrande/addGroupGrande';
import fetchGroupGrande from '../../../actions/GroupGrande/fetchGroupGrande';
import updateGroupGrande from '../../../actions/GroupGrande/updateGroupGrande';
import triggerDrawer from '../../../actions/Application/triggerDrawer';
import addToCart from '../../../actions/Cart/addToCart';

// Required components
import Text from '../typography/Text';
import QuantitySelector from '../../common/forms/QuantitySelector';
import Button from '../../common/buttons/Button';
import Modal from '../../common/modals/Modal';
import GroupAddForm from '../groups/GroupAddForm';

/**
 * Component
 */
class ProductListItemCajonGrande extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired,
        executeAction: React.PropTypes.func.isRequired,
    };

    state = {
        productPlaceholderImage: undefined,
        quantity:1,
        cartLoading: this.context.getStore(CartStore).isLoading(),
        cartProducts: this.context.getStore(CartStore).getProducts(),
        addingToCart: false,
        addGroupGrande: this.context.getStore(GroupGrandeAddStore).getState(),
        group: this.context.getStore(GroupGrandeDetailsStore).getGroup(),
        user: this.context.getStore(AccountStore).getAccountDetails(),
        buyers: [],
        registerModal: false,
        showNewGroupModal: false,
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./ProductListItemCajonGrande.scss');

        // Load static files
        this.setState({
            productPlaceholderImage: require('../images/image_placeholder.png')
        });
       this.context.executeAction(fetchGroupGrande, "f6c3e113-a99e-4d24-82a3-a77b559fcb7e");
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
            cartProducts: nextProps._cartProducts,
            addGroupGrande: nextProps._addGroupGrande,
            group: nextProps._group,
            user: nextProps._user,
            buyers: [],
            registerModal: false,
            showNewGroupModal: false,
        });
    }

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

    handleGetOutGroupClick = () => {
       let index = this.state.group.buyers.indexOf(this.state.user.email);
       if (index >= 0) {
         let groupDuplicateWithoutBuyer = this.state.group;
         groupDuplicateWithoutBuyer.buyers.splice( index, 1 );
         this.context.executeAction(updateGroupGrande, {
             id: groupDuplicateWithoutBuyer.id,
             data: {
                 name: groupDuplicateWithoutBuyer.name,
                 tags: groupDuplicateWithoutBuyer.tags,
                 buyers: groupDuplicateWithoutBuyer.buyers
             }
         });
         this.forceUpdate();
       }
   };

   handleGetInGroupClick = () => {
     let group;

     if (this.state.group && this.state.user.email) {
       group =  this.state.group;
       group.buyers.push(this.state.user.email);
     }

     this.context.executeAction(updateGroupGrande, {
         id: group.id,
         data: {
             name: group.name,
             tags: group.tags,
             buyers: group.buyers
         }
     });

     let payload = Object.assign({details: this.props.product}, {
         id: this.props.product.id,
         quantity: this.getQuantityInCart() + this.state.quantity
     });
     this.setState({addingToCart: true});
     this.context.executeAction(addToCart, payload);
     };

     handleNewGroupClick = () => {
      this.setState({showNewGroupModal: true});
      };

      handleNewGroupCloseClick = () => {
          this.setState({showNewGroupModal: false});
      };

      handleShowThanksModalCloseClick = () => {
          this.setState({showThanksModal: false});
      };

      handleNewGroupSubmitClick = (data) => {
          this.context.executeAction(addGroupGrande, data);
          this.setState({showNewGroupModal: false});
      };

      handleRegisterBottom = () => {
          this.setState({registerModal: true});
      };

      handleRegiserModalCloseClick = () => {
          this.setState({registerModal: false});
      };

      render() {
        let intlStore = this.context.getStore(IntlStore);
        let isLogged = this.context.getStore(AccountStore).getAccountDetails();
        let isAdmin = this.context.getStore(AccountStore).isAuthorized(['admin']);
        let routeParams = {locale: intlStore.getCurrentLocale()};

        let newGroupModal = () => {
          if (this.state.showNewGroupModal) {
              return (
                  <Modal title={intlStore.getMessage(intlData, 'newModalTitle')}
                         onCloseClick={this.handleNewGroupCloseClick}>
                      <GroupAddForm
                          onCancelClick={this.handleNewGroupCloseClick}
                          onSubmitClick={this.handleNewGroupSubmitClick} />
                  </Modal>
              );
          }
        };

        let thanksModal = () => {
            if (this.state.showThanksModal) {
                return (
                    <Modal title={intlStore.getMessage(intlData, 'anotadoModalTitle')}
                            onCloseClick={this.handleShowThanksModalCloseClick}>
                           <div className="grande-groups-register-modal-container">
                             <FormattedMessage
                                 message={intlStore.getMessage(intlData, 'thanksModalText')}
                                 locales={intlStore.getCurrentLocale()} />
                              <div className="grande-groups-bottoms-container">
                                 <div className="grande-groups__register-button">
                                   <Link to="checkout" params={routeParams}>
                                     <Button type="primary">
                                         <FormattedMessage
                                             message={intlStore.getMessage(intlData, 'checkout')}
                                             locales={intlStore.getCurrentLocale()} />
                                     </Button>
                                   </Link>
                                 </div>
                                 <div className="grande-groups__keep-buying-button">
                                     <Button type="primary" onClick={this.handleShowThanksModalCloseClick}>
                                         <FormattedMessage
                                             message={intlStore.getMessage(intlData, 'continueShopping')}
                                             locales={intlStore.getCurrentLocale()} />
                                     </Button>
                                 </div>
                              </div>
                          </div>
                    </Modal>
                );
            }
        };

        let registerModal = () => {
            if (this.state.registerModal) {
                return (
                    <Modal title={intlStore.getMessage(intlData, 'registerModalTitle')}
                           onCloseClick={this.handleRegiserModalCloseClick}>
                           <div className="grande-groups-register-modal-container">
                             <div className="grande-product-page__suscribe-button">
                               <Link to="login" params={routeParams}>
                                 <Button type="primary">
                                     <FormattedMessage
                                         message={intlStore.getMessage(intlData, 'login')}
                                         locales={intlStore.getCurrentLocale()} />
                                 </Button>
                               </Link>
                             </div>
                             <div className="grande-product-page__suscribe-button">
                               <Link to="register" params={routeParams}>
                                 <Button type="primary">
                                     <FormattedMessage
                                         message={intlStore.getMessage(intlData, 'register')}
                                         locales={intlStore.getCurrentLocale()} />
                                 </Button>
                               </Link>
                             </div>
                             <div className="grande-product-page__suscribe-button">
                               <Button type="default" onClick={this.handleRegiserModalCloseClick}>
                                   <FormattedMessage
                                       message={intlStore.getMessage(intlData, 'cancel')}
                                       locales={intlStore.getCurrentLocale()} />
                               </Button>
                             </div>
                          </div>
                    </Modal>
                );
            }
        };

        let productDescription = () => {
          return (
             <div className="grande-groups-page__description">
                 <div className="grande-groups-table">
                     <table className="grande-groups-table__table">
                         <thead>
                             <tr className="grande-groups-table__row">
                               <th className="grande-groups-table__heading">
                                   <Text weight="bold" size="medium">Productos</Text>
                               </th>
                               <th className="grande-groups-table__heading">
                                   <Text weight="bold" size="medium">Cantidad</Text>
                               </th>
                             </tr>
                         </thead>
                         <tbody className="grande-groups-table__body">
                           <tr className="grande-groups-table__row">
                             <td className="grande-groups-table__data"><Text size="medium">Tomate Perita</Text></td>
                             <td className="grande-groups-table__data"><Text size="medium">1.2 kg.</Text></td>
                           </tr>
                           <tr className="grande-groups-table__row">
                             <td className="grande-groups-table__data"><Text size="medium">Zanahoria</Text></td>
                             <td className="grande-groups-table__data"><Text size="medium">1.2 kg.</Text></td>
                           </tr>
                           <tr className="grande-groups-table__row">
                             <td className="grande-groups-table__data"><Text size="medium">Cebolla</Text></td>
                             <td className="grande-groups-table__data"><Text size="medium">1.2 kg.</Text></td>
                           </tr>
                           <tr className="grande-groups-table__row">
                             <td className="grande-groups-table__data"><Text size="medium">Batata</Text></td>
                             <td className="grande-groups-table__data"><Text size="medium">1.2 kg.</Text></td>
                           </tr>
                           <tr className="grande-groups-table__row">
                             <td className="grande-groups-table__data"><Text size="medium">Papa</Text></td>
                             <td className="grande-groups-table__data"><Text size="medium">1.2 kg.</Text></td>
                           </tr>
                           <tr className="grande-groups-table__row">
                             <td className="grande-groups-table__data"><Text size="medium">Zapallo Brasilero</Text></td>
                             <td className="grande-groups-table__data"><Text size="medium">1.5 kg</Text></td>
                           </tr>
                           <tr className="grande-groups-table__row">
                             <td className="grande-groups-table__data"><Text size="medium">Limones</Text></td>
                             <td className="grande-groups-table__data"><Text size="medium">3 unidades</Text></td>
                           </tr>
                           <tr className="grande-groups-table__row">
                             <td className="grande-groups-table__data"><Text size="medium">Huevos</Text></td>
                             <td className="grande-groups-table__data"><Text size="medium">8 unidades</Text></td>
                           </tr>
                           <tr className="grande-groups-table__row">
                             <td className="grande-groups-table__data"><Text size="medium">Morrón Verde o Rojo</Text></td>
                             <td className="grande-groups-table__data"><Text size="medium">800 o 400 grs.</Text></td>
                           </tr>
                           <tr className="grande-groups-table__row">
                             <td className="grande-groups-table__data"><Text size="medium">Banana</Text></td>
                             <td className="grande-groups-table__data"><Text size="medium">1,5 kgs.</Text></td>
                           </tr>
                           <tr className="grande-groups-table__row">
                             <td className="grande-groups-table__data"><Text size="medium">Manzana</Text></td>
                             <td className="grande-groups-table__data"><Text size="medium">1 kg.</Text></td>
                           </tr>
                           <tr className="grande-groups-table__row">
                             <td className="grande-groups-table__data"><Text size="medium">Zapallito Verde</Text></td>
                             <td className="grande-groups-table__data"><Text size="medium">1 kg.</Text></td>
                           </tr>
                           <tr className="grande-groups-table__row">
                             <td className="grande-groups-table__data"><Text size="medium">Cebollita de V.</Text></td>
                             <td className="grande-groups-table__data"><Text size="medium">3 atados</Text></td>
                           </tr>
                           <tr className="grande-groups-table__row">
                             <td className="grande-groups-table__data"><Text size="medium">Naranja</Text></td>
                             <td className="grande-groups-table__data"><Text size="medium">1.5 kg.</Text></td>
                           </tr>
                           <tr className="grande-groups-table__row">
                             <td className="grande-groups-table__data"><Text size="medium">Lechuga Romana</Text></td>
                             <td className="grande-groups-table__data"><Text size="medium">2 atados</Text></td>
                           </tr>
                         </tbody>
                     </table>
                 </div>
             </div>
           );
        }

        return (
            <div className="grande-product-list-item" itemScope itemType="http://schema.org/Product">
             {registerModal()}
             {thanksModal()}
                 { isAdmin ?
                     <div className="grande-groups__toolbar">
                     {newGroupModal()}
                         <div className="grande-groups__add-button">
                             <Button type="primary" onClick={this.handleNewGroupClick}>
                                 <FormattedMessage
                                     message={intlStore.getMessage(intlData, 'new')}
                                     locales={intlStore.getCurrentLocale()} />
                             </Button>
                         </div>
                     </div>
                     :
                     null
                 }
                <div className="grande-product-list-item__name" itemProp="name">
                    <Text size="large" weight="bold">
                        <FormattedMessage
                            message={intlStore.getMessage(this.props.product.name)}
                            locales={intlStore.getCurrentLocale()} />
                    </Text>
                    <span style={{display: 'none'}} itemProp="sku">{this.props.product.sku}</span>
                </div>
                <div className="grande-product-list-item__image">
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
                <div className="grande-product-list-item__name" itemProp="description">
                    {productDescription()}
                </div>
                {this.props.product.pricing ?
                    <div className="grande-product-list-item__price" itemProp="offers" itemScope itemType="http://schema.org/Offer">
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
                <div className="grande-product-page__quantity">
                    <Text size="medium" weight="bold">
                       <FormattedMessage message={intlStore.getMessage(intlData, 'quantity')}
                                      locales={intlStore.getCurrentLocale()} />
                    </Text>
                    <QuantitySelector value={this.state.quantity}
                                      onChange={this.handleQuantityChange} />
                </div>

                { isLogged ?
                    <div className="grande-product-page__add">
                        <div className="grande-product-page__add-buttons">
                            {this.props.product.stock > 0 ?
                                <div>
                                  <div className="grande-product-page__add-button">
                                    <Button type="primary"
                                            onClick={this.handleAddToCartClick}
                                            disabled={this.state.quantity <= 0 || this.state.cartLoading}>
                                        <FormattedMessage
                                            message={intlStore.getMessage(intlData, 'addToCart')}
                                            locales={intlStore.getCurrentLocale()} />
                                    </Button>
                                  </div>
                                  { this.state.group && this.state.group.buyers.indexOf(this.state.user.email) !== -1 ?
                                      <div className="grande-product-page__desuscribe-button">
                                        <Button type="primary" onClick={this.handleGetOutGroupClick.bind()}>
                                            <FormattedMessage
                                                message={intlStore.getMessage(intlData, 'desuscribirse')}
                                                locales={intlStore.getCurrentLocale()} />
                                        </Button>
                                      </div>
                                    :
                                      <div className="grande-product-page__suscribe-button">
                                        <Button type="primary" onClick={this.handleGetInGroupClick.bind()}>
                                            <FormattedMessage
                                                message={intlStore.getMessage(intlData, 'suscribirse')}
                                                locales={intlStore.getCurrentLocale()} />
                                        </Button>
                                      </div>
                                     }
                                 </div>
                                :
                                <Button type="primary" disabled={true}>
                                    <FormattedMessage
                                        message={intlStore.getMessage(intlData, 'outOfStock')}
                                        locales={intlStore.getCurrentLocale()} />
                                </Button>
                            }
                        </div>
                    </div>
                :
                <div className="grande-product-page__add">
                    <div className="grande-product-page__add-buttons">
                        {this.props.product.stock > 0 ?
                            <div>
                              <div className="grande-product-page__add-button">
                                <Button type="primary"
                                        onClick={this.handleAddToCartClick}
                                        disabled={this.state.quantity <= 0 || this.state.cartLoading}>
                                    <FormattedMessage
                                        message={intlStore.getMessage(intlData, 'addToCart')}
                                        locales={intlStore.getCurrentLocale()} />
                                </Button>
                              </div>
                              <div className="grande-product-page__suscribe-button">
                                  <Button type="primary" onClick={this.handleRegisterBottom}>
                                      <FormattedMessage
                                          message={intlStore.getMessage(intlData, 'suscribirse')}
                                          locales={intlStore.getCurrentLocale()} />
                                  </Button>
                              </div>
                             </div>
                            :
                            <Button type="primary" disabled={true}>
                                <FormattedMessage
                                    message={intlStore.getMessage(intlData, 'outOfStock')}
                                    locales={intlStore.getCurrentLocale()} />
                            </Button>
                        }
                      </div>
                  </div>
                  }
            </div>
        );
    }
}

ProductListItemCajonGrande = connectToStores(ProductListItemCajonGrande, [CartStore, AccountStore, GroupGrandeDetailsStore, GroupGrandeAddStore], (context) => {
    return {
        _cartLoading: context.getStore(CartStore).isLoading(),
        _cartProducts: context.getStore(CartStore).getProducts(),
        _user: context.getStore(AccountStore).getAccountDetails(),
        _group: context.getStore(GroupGrandeDetailsStore).getGroup(),
        _addGroupGrande: context.getStore(GroupGrandeAddStore).getState(),
    };
});

export default ProductListItemCajonGrande;
