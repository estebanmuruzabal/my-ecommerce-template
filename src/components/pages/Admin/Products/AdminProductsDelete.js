/**
 * Imports
 */
import React from 'react';
import {FormattedMessage} from 'react-intl';
import { Link} from 'react-router';

// Flux
import IntlStore from '../../../../stores/Application/IntlStore';

// Required components
import Button from '../../../common/buttons/Button';
import Select from '../../../common/forms/Select';
import Text from '../../../common/typography/Text';

// Translation data for this component
import intlData from './AdminProductsEdit.intl';
import deleteProduct from '../../../../actions/Admin/deleteProduct';

// Instantiate logger
let debug = require('debug')('tienda765');

/**
 * Component
 */
class AdminProductsDelete extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };


    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./AdminProductsUpload.scss');
    }

    //*** Template ***//

    render() {

        //
        // Helper methods & variables
        //
        let intlStore = this.context.getStore(IntlStore);
        let routeParams = {locale: intlStore.getCurrentLocale()}; // Base route params

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
                      <Link to="adm-products" params={routeParams}>
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
AdminProductsDelete.defaultProps = {
    onCancelClick: function () { debug('onCancelClick not defined'); }
};
/**
 * Exports
 */
export default AdminProductsDelete;
