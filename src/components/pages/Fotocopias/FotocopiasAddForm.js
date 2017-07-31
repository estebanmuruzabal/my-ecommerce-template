/**
 * Imports
 */
import React from 'react';
import {FormattedMessage} from 'react-intl';

// Flux
import IntlStore from '../../../stores/Application/IntlStore';
import createCopies from '../../../actions/Fotocopias/createCopies';

// Required components
import Button from '../../common/buttons/Button';
import Select from '../../common/forms/Select';
import Heading from '../../common/typography/Heading';
import FilesLibraryManager from '../../containers/files/FilesLibraryManager';
import InlineItems from '../../common/forms/InlineItems';
import InputField from '../../common/forms/InputField';
import NotFound from '../NotFound/NotFound';
import Textarea from '../../common/forms/Textarea';
import ToggleSwitch from '../../common/buttons/ToggleSwitch';

// Translation data for this component
import intlData from './FotocopiasAddForm.intl';

// Instantiate logger
let debug = require('debug')('tienda765');

/**
 * Component
 */
class FotocopiasAddForm extends React.Component {

  static contextTypes = {
      executeAction: React.PropTypes.func.isRequired,
      getStore: React.PropTypes.func.isRequired
  };

    //*** Initial State ***//

    state = {
        name: undefined,
        description: undefined,
        pagetype: undefined,
        fieldErrors: {},
        copiesnum: undefined,
        files: [],
        phone: undefined
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./FotocopiasAddForm.scss');
    }

    handlePageTypeChange = (value) => {
      this.setState({pagetype: value});
    };

    handleDescriptionFieldChange = (value) => {
      this.setState({description: value});
    };

    handleFileLibraryChange = (value) => {
      this.setState({files: value});
    };

    handleCopiesNumChange = (value) => {
      this.setState({copiesnum: value});
    };


//////////////

    handleSubmitClick = () => {
        let intlStore = this.context.getStore(IntlStore);

        this.setState({fieldErrors: {}});
        let fieldErrors = {};
        if (!this.state.name) {
            fieldErrors.name = intlStore.getMessage(intlData, 'fieldRequired');
        }
        if (!this.state.pagetype) {
            fieldErrors.pagetype = intlStore.getMessage(intlData, 'fieldRequired');
        }
        if (!this.state.copiesnum) {
            fieldErrors.copiesnum = intlStore.getMessage(intlData, 'fieldRequired');
        }
        if (!this.state.phone) {
            fieldErrors.phone = intlStore.getMessage(intlData, 'fieldRequired');
        }


        this.setState({fieldErrors: fieldErrors});

        if (Object.keys(fieldErrors).length === 0) {
            this.props.onSubmitClick({
              files: this.state.copies.files,
              pagetype: this.state.copies.pagetype,
              description: this.state.copies.description,
              pagenum: this.state.copies.pagenum
            });
        }
    };


    render() {

        let intlStore = this.context.getStore(IntlStore);

        let fieldError = (field) => {
            return this.props.error ? this.props.error[field] : this.state.fieldErrors[field];
        };



        return (
          <div>

            <div className="fotocopias-page__form-item">
                
            </div>


              <div className="fotocopias-page__button">
                  <Button type="primary" onClick={this.handleSubmitClick}>
                      <FormattedMessage
                          message={intlStore.getMessage(intlData, 'Conti')}
                          locales={intlStore.getCurrentLocale()} />
                  </Button>
              </div>
          </div>
        );
    }
}

/**
 * Default Props
 */
FotocopiasAddForm.defaultProps = {
    onSubmitClick: function (data) { debug(`onSubmitClick not defined. Value: ${data}`); }
};

/**
 * Exports
 */
export default FotocopiasAddForm;
