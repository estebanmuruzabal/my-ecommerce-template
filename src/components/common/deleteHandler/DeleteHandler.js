/**
 * Imports
 */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';

// Flux
import IntlStore from '../../../stores/Application/IntlStore';

// Required components
import Button from '../buttons/Button';
import Select from '../forms/Select';
import Text from '../typography/Text';

// Translation data for this component
import intlData from './DeleteHandler.intl';
import deleteProduct from '../../../actions/Admin/deleteProduct';

// Instantiate logger
let debug = require('debug')('tienda765');

/**
 * Component
 */
class DeleteHandler extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };


    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./DeleteHandler.scss');
    }

    //*** Template ***//

    render() {

        //
        // Helper methods & variables
        //
        let intlStore = this.context.getStore(IntlStore);
        let routeParams = { locale: intlStore.getCurrentLocale() }; // Base route params

        //
        // Return
        //
        return (
            <div className="admin-products-upload">
                <div className="admin-products-upload__actions">
                    <div className="admin-products-upload__button">
                        <Button type="default" onClick={this.props.onCancelClick}>
                            <FormattedMessage
                                message={intlStore.getMessage(intlData, 'cancel')}
                                locales={intlStore.getCurrentLocale()} />
                        </Button>
                    </div>
                    <div className="admin-products-upload__button">
                        <Link to="admin-panel" params={routeParams}>
                            <Button type="primary" onClick={this.props.onSubmitClick}>
                                <FormattedMessage
                                    message={intlStore.getMessage(intlData, 'delete')}
                                    locales={intlStore.getCurrentLocale()} />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

/**
* Default Props
*/
DeleteHandler.defaultProps = {
    onCancelClick: function () { debug('onCancelClick not defined'); }
};
/**
* Exports
*/
export default DeleteHandler;
