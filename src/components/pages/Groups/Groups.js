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
import GroupsStore from '../../../stores/Groups/GroupsStore';
import IntlStore from '../../../stores/Application/IntlStore';

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
        groups: this.context.getStore(GroupsListStore).getGroups()
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./Groups.scss');
    }

    componentWillReceiveProps(nextProps) {
        // Update state
        this.setState({
            addGroup: nextProps._addGroups,
            groups: nextProps.groups
        });
    }

    //*** View Controllers ***//

    handleNewCollectionClick = () => {
        this.setState({showNewCollectionModal: true});
    };

    handleNewCollectionCloseClick = () => {
        this.setState({showNewCollectionModal: false});
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
        let routeParams = {locale: this.context.getStore(IntlStore).getCurrentLocale()}; // Base route params

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
                    <span className="admin-collections__link">
                        <Link to="adm-collection-edit" params={Object.assign({groupId: group.id}, routeParams)}>
                            <FormattedMessage
                                message={intlStore.getMessage(group.name)}
                                locales={intlStore.getCurrentLocale()} />
                        </Link>
                    </span>
                ]
            };
        });


        //
        // Return
        //
        return (
            <div className="admin-collections">

            </div>
        );
    }
}

/**
 * Flux
 */
Groups = connectToStores(Groups, [GroupsAddStore, GroupsListStore], (context) => {
    return {
        _addGroups: context.getStore(GroupsAddStore).getState(),
        _groups: context.getStore(GroupsListStore).getGroups()
    };
});

/**
 * Exports
 */
export default Groups;
