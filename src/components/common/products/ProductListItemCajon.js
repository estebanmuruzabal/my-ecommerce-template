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
import GroupsAddStore from '../../../stores/Groups/GroupsAddStore';
import GroupsListStore from '../../../stores/Groups/GroupsListStore';
import AccountStore from '../../../stores/Account/AccountStore';

// actions
import addGroup from '../../../actions/Groups/addGroup';
import fetchGroups from '../../../actions/Groups/fetchGroups';
import updateGroup from '../../../actions/Groups/updateGroup';
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
class ProductListItemCajon extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired,
        executeAction: React.PropTypes.func.isRequired,
    };

    static fetchData = function (context, params, query, done) {
      context.executeAction(fetchGroups, {}, done);
    };

    state = {
        productPlaceholderImage: undefined,
        quantity:1,
        cartLoading: this.context.getStore(CartStore).isLoading(),
        cartProducts: this.context.getStore(CartStore).getProducts(),
        addingToCart: false,
        addGroup: this.context.getStore(GroupsAddStore).getState(),
        groups: this.context.getStore(GroupsListStore).getGroups(),
        user: this.context.getStore(AccountStore).getAccountDetails(),
        buyers: [],
        registerModal: false,
        showNewGroupModal: false,
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./ProductListItemCajon.scss');

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
            cartProducts: nextProps._cartProducts,
            addGroup: nextProps._addGroup,
            groups: nextProps._groups,
            user: nextProps._user,
            buyers: [],
            registerModal: false,
            showNewGroupModal: false,
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

    handleGetOutGroupClick = (group) => {
       let index = group.buyers.indexOf(this.state.user.email);
       if (index >= 0) {
         group.buyers.splice( index, 1 );
         this.context.executeAction(updateGroup, {
             id: group.id,
             data: {
                 name: group.name,
                 tags: group.tags,
                 buyers: group.buyers
             }
         });
         this.forceUpdate();
       }
   };

   handleGetInGroupClick = (group) => {
     let user = this.state.user;

     group.buyers.push(user.email);
     this.context.executeAction(updateGroup, {
         id: group.id,
         data: {
             name: group.name,
             tags: group.tags,
             buyers: group.buyers
         }
     });

     let payload = Object.assign({details: this.state.product}, {
         id: this.state.product.id,
         quantity: 1
     });
     this.context.executeAction(addToCart, payload);
     this.setState({addingToCart: true,showThanksModal: true});

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
          this.context.executeAction(addGroup, data);
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
                           <div className="groups-register-modal-container">
                             <FormattedMessage
                                 message={intlStore.getMessage(intlData, 'thanksModalText')}
                                 locales={intlStore.getCurrentLocale()} />
                              <div className="groups-bottoms-container">
                                 <div className="groups__register-button">
                                   <Link to="checkout" params={routeParams}>
                                     <Button type="primary">
                                         <FormattedMessage
                                             message={intlStore.getMessage(intlData, 'checkout')}
                                             locales={intlStore.getCurrentLocale()} />
                                     </Button>
                                   </Link>
                                 </div>
                                 <div className="groups__keep-buying-button">
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
                           <div className="groups-register-modal-container">
                             <div className="groups__register-button">
                               <Link to="login" params={routeParams}>
                                 <Button type="primary">
                                     <FormattedMessage
                                         message={intlStore.getMessage(intlData, 'login')}
                                         locales={intlStore.getCurrentLocale()} />
                                 </Button>
                               </Link>
                             </div>
                             <div className="groups__register-button">
                               <Link to="register" params={routeParams}>
                                 <Button type="primary">
                                     <FormattedMessage
                                         message={intlStore.getMessage(intlData, 'register')}
                                         locales={intlStore.getCurrentLocale()} />
                                 </Button>
                               </Link>
                             </div>
                             <div className="groups__register-button">
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
                               <td className="groups-table__data"><Text size="medium">Zapallo Brasilero o Anco</Text></td>
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
                               <td className="groups-table__data"><Text size="medium">Morrón Verde o Berenjena</Text></td>
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
                               <td className="groups-table__data"><Text size="medium">Zapallo Brasilero o Anco</Text></td>
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
                               <td className="groups-table__data"><Text size="medium">Morrón Verde o Berenjena</Text></td>
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
                               <td className="groups-table__data"><Text size="medium">Zapallo Brasilero o Anco</Text></td>
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
                               <td className="groups-table__data"><Text size="medium">Morrón Verde o Berenjena</Text></td>
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
                               <td className="groups-table__data"><Text size="medium">2 atados</Text></td>
                             </tr>
                           </tbody>
                       </table>
                   </div>
               </div>
             );
          }
        }
        console.log("grouuups",this.state.groups);
        return (
            <div className="product-list-item" itemScope itemType="http://schema.org/Product">
             {registerModal()}
             {thanksModal()}
                 { isAdmin ?
                     <div className="groups__toolbar">
                     {newGroupModal()}
                         <div className="groups__add-button">
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
                <div className="product-list-item__name" itemProp="description">
                    {productDescription()}
                </div>
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

                { isLogged ?
                    <div className="product-page__add">
                        <div className="product-page__add-buttons">
                            {this.props.product.stock > 0 ?
                                <div>
                                  <div className="product-page__add-button">
                                    <Button type="primary"
                                            onClick={this.handleAddToCartClick}
                                            disabled={this.props.quantity <= 0 || this.state.cartLoading}>
                                        <FormattedMessage
                                            message={intlStore.getMessage(intlData, 'addToCart')}
                                            locales={intlStore.getCurrentLocale()} />
                                    </Button>
                                  </div>

                                    <div className="product-page__add-button">
                                      <Button type="primary" onClick={this.handleGetInGroupClick.bind(null)}>
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
                :
                <div className="product-page__add">
                    <div className="product-page__add-buttons">
                        {this.props.product.stock > 0 ?
                            <div>
                              <div className="product-page__add-button">
                                <Button type="primary"
                                        onClick={this.handleAddToCartClick}
                                        disabled={this.props.quantity <= 0 || this.state.cartLoading}>
                                    <FormattedMessage
                                        message={intlStore.getMessage(intlData, 'addToCart')}
                                        locales={intlStore.getCurrentLocale()} />
                                </Button>
                              </div>
                              <div className="groups__add-button">
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

ProductListItemCajon = connectToStores(ProductListItemCajon, [CartStore, AccountStore, GroupsListStore], (context) => {
    return {
        _cartLoading: context.getStore(CartStore).isLoading(),
        _cartProducts: context.getStore(CartStore).getProducts(),
        _user: context.getStore(AccountStore).getAccountDetails(),
        _groups: context.getStore(GroupsListStore).getGroups(),
        _addGroup: context.getStore(GroupsAddStore).getState(),
    };
});

export default ProductListItemCajon;
