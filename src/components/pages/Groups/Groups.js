/**
 * Imports
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router';

// Flux
import GroupsAddStore from '../../../stores/Groups/GroupsAddStore';
import GroupsListStore from '../../../stores/Groups/GroupsListStore';
import IntlStore from '../../../stores/Application/IntlStore';
import AccountStore from '../../../stores/Account/AccountStore';
import ProductDetailsStore from '../../../stores/Products/ProductDetailsStore';

import addGroup from '../../../actions/Groups/addGroup';
import fetchGroups from '../../../actions/Groups/fetchGroups';
import updateGroup from '../../../actions/Groups/updateGroup';
import fetchProductAndCheckIfFound from '../../../actions/Products/fetchProductAndCheckIfFound';
import addToCart from '../../../actions/Cart/addToCart';

// Required components
import Button from '../../common/buttons/Button';
import Heading from '../../common/typography/Heading';
import Label from '../../common/indicators/Label';
import Modal from '../../common/modals/Modal';
import StatusIndicator from '../../common/indicators/StatusIndicator';
import Table from '../../common/tables/Table';
import Text from '../../common/typography/Text';
import GroupAddForm from './GroupAddForm';
import VerdurasProduct from './VerdurasProduct';

import { Circle } from 'rc-progress';

// Translation data for this component
import intlData from './Groups.intl';

/**
 * Component
 */
class Groups extends React.Component {

    static contextTypes = {
        executeAction: React.PropTypes.func.isRequired,
        getStore: React.PropTypes.func.isRequired,
        router: React.PropTypes.func.isRequired
    };

    static fetchData = function (context, params, query, done) {
        context.executeAction(fetchGroups, {}, done);
    };

    state = {
        product: this.context.getStore(ProductDetailsStore).getProduct(),
        addGroup: this.context.getStore(GroupsAddStore).getState(),
        groups: this.context.getStore(GroupsListStore).getGroups(),
        user: this.context.getStore(AccountStore).getAccountDetails(),
        buyers: [],
        registerModal: false
    };

    componentDidMount() {
        require('./Groups.scss');
        this.context.executeAction(fetchProductAndCheckIfFound, '3f1bad55-0060-4553-b918-d29d6892cf3b');
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
          product: nextProps._product,
            addGroup: nextProps._addGroup,
            groups: nextProps._groups,
            user: nextProps._user,
            buyers: [],
            registerModal: false
        });
    }

    //*** View Controllers ***//

    handleNewGroupClick = () => {
        this.setState({showNewGroupModal: true});
    };

    handleNewGroupCloseClick = () => {
        this.setState({showNewGroupModal: false});
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

    handleGetInGroupClick = (group) => {
      let user = this.state.user;

          if(group.buyers.length == 14) {
            alert("Se ha completado el grupo de compradores. Por favor unirse a uno incompleto.");
          } else if (group.buyers.indexOf(user.email) !== -1){
              if (confirm("Usted Ya esta en el grupo. Desea comprar otra unidad?") == true) {
                      group.buyers.push(user.email);
                      this.context.executeAction(updateGroup, {
                          id: group.id,
                          data: {
                              name: group.name,
                              tags: group.tags,
                              buyers: group.buyers
                          }
                      });
                  }
          } else {
            group.buyers.push(user.email);
            this.context.executeAction(updateGroup, {
                id: group.id,
                data: {
                    name: group.name,
                    tags: group.tags,
                    buyers: group.buyers
                }
            });
          }


          let payload = Object.assign({details: this.state.product}, {
              id: this.state.product.id,
              quantity: 1
          });
          this.setState({addingToCart: true});
          this.context.executeAction(addToCart, payload);


    };

    //*** Template ***//

    render() {
        let intlStore = this.context.getStore(IntlStore);
        let routeParams = {locale: this.context.getStore(IntlStore).getCurrentLocale()};
        let isAdmin = this.context.getStore(AccountStore).isAuthorized(['admin']);
        let isLogged = this.context.getStore(AccountStore).getAccountDetails();

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

        let registerModal = () => {
            if (this.state.registerModal) {
                return (
                    <Modal title={intlStore.getMessage(intlData, 'registerModalTitle')}
                           onCloseClick={this.handleRegiserModalCloseClick}>
                           <div className="groups__add-button">
                             <Link to="login" params={routeParams}>
                               <Button type="primary">
                                   <FormattedMessage
                                       message={intlStore.getMessage(intlData, 'login')}
                                       locales={intlStore.getCurrentLocale()} />
                               </Button>
                             </Link>
                           </div>
                           <div className="groups__add-button">
                             <Link to="register" params={routeParams}>
                               <Button type="primary">
                                   <FormattedMessage
                                       message={intlStore.getMessage(intlData, 'register')}
                                       locales={intlStore.getCurrentLocale()} />
                               </Button>
                             </Link>
                           </div>
                           <div className="groups__add-button">
                             <Button type="default" onClick={this.handleRegiserModalCloseClick}>
                                 <FormattedMessage
                                     message={intlStore.getMessage(intlData, 'cancel')}
                                     locales={intlStore.getCurrentLocale()} />
                             </Button>
                           </div>
                    </Modal>
                );
            }
        };

        return (
          <div className="groups">
              <div className="groups__title">
                  <Heading size="large">
                      <FormattedMessage
                          message={intlStore.getMessage(intlData, 'title')}
                          locales={intlStore.getCurrentLocale()} />
                  </Heading>
              </div>
              <div className="groups__content">
              {registerModal()}
                <div className="groups__block">
                    <Heading size="medium">
                      <FormattedMessage
                          message={intlStore.getMessage(intlData, 'subtitle')}
                          locales={intlStore.getCurrentLocale()} />
                    </Heading>
                    <div className="groups__support">
                        <p><FormattedMessage
                            message={intlStore.getMessage(intlData, 'content1')}
                            locales={intlStore.getCurrentLocale()} /></p>
                    </div>
                </div>
              </div>

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

              {this.state.groups.length === 0 ?
                  <div className="groups__no-results">
                      <Text size="small">
                          <FormattedMessage message={intlStore.getMessage(intlData, 'noResults')}
                                            locales={intlStore.getCurrentLocale()} />
                      </Text>
                  </div>
                  :
                  <div className="groups__list">
                        {this.state.groups.map((group, idx) => {
                            return (
                                <div key={idx} className="groups-item">
                                  <span className="groups__labels">
                                    <FormattedMessage
                                        message={intlStore.getMessage(group.name)}
                                        locales={intlStore.getCurrentLocale()} />
                                  </span>
                                  <div className="circule-container">
                                    <Circle percent={group.buyers.length * 7.14} strokeWidth="6" trailWidth="2"
                                                    gapDegree="45" gapPosition="bottom" strokeColor="red" initialAnimate/>
                                  </div>
                                  <Text size="medium">
                                      <div className="groups__labels">
                                        {group.buyers.length} / 14
                                      </div>
                                  </Text>
                                  { isLogged ?
                                      <div className="groups__add-button">
                                          <Button type="primary" onClick={this.handleGetInGroupClick.bind(null, group)}>
                                              <FormattedMessage
                                                  message={intlStore.getMessage(intlData, 'anotarse')}
                                                  locales={intlStore.getCurrentLocale()} />
                                          </Button>
                                      </div>
                                      :
                                      <div className="groups__add-button">
                                          <Button type="primary" onClick={this.handleRegisterBottom}>
                                              <FormattedMessage
                                                  message={intlStore.getMessage(intlData, 'anotarse')}
                                                  locales={intlStore.getCurrentLocale()} />
                                          </Button>
                                      </div>
                                  }
                                </div>
                            );
                        })}
                  </div>
              }
              <VerdurasProduct productId="3f1bad55-0060-4553-b918-d29d6892cf3b"/>
          </div>
        );
    }
}

/**
 * Flux
 */
Groups = connectToStores(Groups, [GroupsAddStore, AccountStore , GroupsListStore, ProductDetailsStore], (context) => {
    return {
        _product: context.getStore(ProductDetailsStore).getProduct(),
        _addGroup: context.getStore(GroupsAddStore).getState(),
        _user: context.getStore(AccountStore).getAccountDetails(),
        _groups: context.getStore(GroupsListStore).getGroups()
    };
});

/**
 * Exports
 */
export default Groups;
