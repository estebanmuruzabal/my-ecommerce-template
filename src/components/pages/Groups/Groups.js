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

import addGroup from '../../../actions/Groups/addGroup';
import fetchGroups from '../../../actions/Groups/fetchGroups';

// Required components
import Button from '../../common/buttons/Button';
import Heading from '../../common/typography/Heading';
import Label from '../../common/indicators/Label';
import Modal from '../../common/modals/Modal';
import StatusIndicator from '../../common/indicators/StatusIndicator';
import Table from '../../common/tables/Table';
import Text from '../../common/typography/Text';
import GroupAddForm from './GroupAddForm';

//import PieChart from 'react-simple-pie-chart';

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

    //*** Required Data ***//

    static fetchData = function (context, params, query, done) {
        context.executeAction(fetchGroups, {}, done);
    };

    //*** Initial State ***//

    state = {
        addGroup: this.context.getStore(GroupsAddStore).getState(),
        groups: this.context.getStore(GroupsListStore).getGroups(),
        user: this.context.getStore(AccountStore).getAccountDetails(),
    };

    //*** Component Lifecycle ***//
    componentWillMount() {
        //this.context.executeAction(fetchGroups);
    }

    componentDidMount() {

        // Component styles
        require('./Groups.scss');
        //this.context.executeAction(fetchGroups);

    }

    componentWillReceiveProps(nextProps) {
        // Update state
        this.setState({
            addGroup: nextProps._addGroup,
            groups: nextProps.groups,
            user: nextProps._user,
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
    };

    //*** Template ***//

    render() {

        //
        // Helper methods & variables
        //

        let intlStore = this.context.getStore(IntlStore);
        let routeParams = {locale: this.context.getStore(IntlStore).getCurrentLocale()};

        let isAdmin = this.context.getStore(AccountStore).isAuthorized(['admin']);
        let isGroupUser = this.context.getStore(AccountStore).isAuthorized(['groupuser']);

        let headings = [
            <FormattedMessage
                message={intlStore.getMessage(intlData, 'nameHeading')}
                locales={intlStore.getCurrentLocale()} />,
            <FormattedMessage
                message={intlStore.getMessage(intlData, 'parentHeading')}
                locales={intlStore.getCurrentLocale()} />,
            <FormattedMessage
                message={intlStore.getMessage(intlData, 'tagsHeading')}
                locales={intlStore.getCurrentLocale()} />,
            <FormattedMessage
                message={intlStore.getMessage(intlData, 'enabledHeading')}
                locales={intlStore.getCurrentLocale()} />
        ];

        let rows = this.state.groups.map((group) => {
            return {
                data: [
                    <Text size="medium">
                        <div className="groups__labels">
                            {group.tags.map(function (section, idx) {
                                return (
                                    <div key={idx} className="groups__label">
                                        <Label>
                                            <FormattedMessage
                                                message={intlStore.getMessage(intlData, section)}
                                                locales={intlStore.getCurrentLocale()} />
                                        </Label>
                                    </div>
                                );
                            })}
                        </div>
                    </Text>
                ]
            };
        });

        let newGroupModal = () => {
            if (this.state.showNewGroupModal) {
                return (
                    <Modal title={intlStore.getMessage(intlData, 'newModalTitle')}
                           onCloseClick={this.handleNewGroupCloseClick}>
                        <GroupAddForm
                            loading={this.state.addGroup.loading}
                            onCancelClick={this.handleNewGroupCloseClick}
                            onSubmitClick={this.handleNewGroupSubmitClick} />
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
                <div className="groups">
                    {newGroupModal()}

                    <div className="groups__header">
                        <div className="groups__title">
                            <Heading size="medium">
                                <FormattedMessage
                                    message={intlStore.getMessage(intlData, 'title')}
                                    locales={intlStore.getCurrentLocale()} />
                            </Heading>
                        </div>
                        <div className="groups__toolbar">
                            <div className="groups__add-button">
                                <Button type="primary" onClick={this.handleNewGroupClick}>
                                    <FormattedMessage
                                        message={intlStore.getMessage(intlData, 'new')}
                                        locales={intlStore.getCurrentLocale()} />
                                </Button>
                            </div>
                        </div>
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
                      <Table headings={headings} rows={rows} />
                  </div>
              }
          </div>
        );
    }
}

/**
 * Flux
 */
Groups = connectToStores(Groups, [GroupsAddStore, AccountStore , GroupsListStore], (context) => {
    return {
        _addGroup: context.getStore(GroupsAddStore).getState(),
        _user: context.getStore(AccountStore).getAccountDetails(),
        _groups: context.getStore(GroupsListStore).getGroups()
    };
});

/**
 * Exports
 */
export default Groups;

// <div className="pie-container">
// <PieChart
//   slices={[
//     {
//       color: '#f00',
//       value: 10,
//     },
//     {
//       color: '#0f0',
//       value: 20,
//     },
//   ]}
// />
// </div>
