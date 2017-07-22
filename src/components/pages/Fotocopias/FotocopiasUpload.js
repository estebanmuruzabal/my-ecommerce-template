/**
 * Imports
 */
import React from 'react';
import {FormattedMessage} from 'react-intl';

// Flux
import IntlStore from '../../../stores/Application/IntlStore';

// Required components
import Button from '../../common/buttons/Button';
import Select from '../../common/forms/Select';
import Text from '../../common/typography/Text';
import FilesLibraryManager from '../../containers/files/FilesLibraryManager';


// Translation data for this component
import intlData from './FotocopiasUpload.intl';

// Instantiate logger
let debug = require('debug')('tienda765');

/**
 * Component
 */
class FotocopiasUpload extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        content: undefined,
        file: undefined,
        fieldErrors: {}
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./FotocopiasUpload.scss');
    }

    //*** View Controllers ***//

    handleTypeChange = (value) => {
        this.setState({type: value});
    };

    handleFileChange = (evt) => {
        this.setState({file: evt.target.files[0]});
    };

    handleSubmitClick = () => {
        let intlStore = this.context.getStore(IntlStore);

        this.setState({fieldErrors: {}});
        let fieldErrors = {};
        if (!this.state.type) {
            fieldErrors.type = intlStore.getMessage(intlData, 'fieldRequired');
        }
        if (!this.state.file) {
            fieldErrors.file = intlStore.getMessage(intlData, 'fieldRequired');
        }
        this.setState({fieldErrors: fieldErrors});

        if (Object.keys(fieldErrors).length === 0) {
            this.props.onSubmitClick({
                resource: this.state.type,
                file: this.state.file
            });
        }
    };

    //*** Template ***//

    render() {

        //
        // Helper methods & variables
        //

        let intlStore = this.context.getStore(IntlStore);

        let uploadTypeOptions = [
            {name: intlStore.getMessage(intlData, 'copies'), value: 'copies'}
        ];

        //
        // Return
        //
        return (
            <div className="fotocopias-page-upload">

              <div className="admin-collection-edit__form-item">
                  
              </div>

            </div>
        );
    }
}

/**
 * Default Props
 */
FotocopiasUpload.defaultProps = {
    onCancelClick: function () { debug('onCancelClick not defined'); },
    onSubmitClick: function (data) { debug(`onSubmitClick not defined. Value: ${data}`); }
};

/**
 * Exports
 */
export default FotocopiasUpload;
