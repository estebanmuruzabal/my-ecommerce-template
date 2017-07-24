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

    handleNameChange = (value) => {
        this.setState({name: value});
    };

    handlePhoneChange = (value) => {
        this.setState({phone: value});
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

        // if (Object.keys(fieldErrors).length === 0) {
        //     let product = this.state.product;
        //     this.context.executeAction(createCopies, {
        //         data: {
        //
        //         }
        //     });
        if (Object.keys(fieldErrors).length === 0) {
            this.props.onSubmitClick({
              phone: this.state.phone,
              name: this.state.name,
              files: this.state.files,
              pagetype: this.state.pagetype,
              description: this.state.description,
              copiesnum: this.state.copiesnum
            });
        }
    };


    render() {

        let intlStore = this.context.getStore(IntlStore);

        let fieldError = (field) => {
            return this.props.error ? this.props.error[field] : this.state.fieldErrors[field];
        };

        let pageTypeOptions = [
            {name: intlStore.getMessage(intlData, 'oficio'), value: 'oficio'},
            {name: intlStore.getMessage(intlData, 'a4'), value: 'a4'}
        ];

        return (
          <div className="fotocopias-page">
              <div className="fotocopias-page__form">
                  <div className="fotocopias-page__left-column">
                  <div className="fotocopias-page__form-item">
                      <Select label={intlStore.getMessage(intlData, 'pagetype')}
                              placeholder
                              options={pageTypeOptions}
                              onChange={this.handlePageTypeChange}
                              error={fieldError('pagetype')} />
                  </div>
                  <div className="fotocopias-page__form-item">
                      <Textarea label={intlStore.getMessage(intlData, 'description')}
                                rows="5"
                                onChange={this.handleDescriptionFieldChange}
                                value={this.state.description}
                                error={fieldError('description')} />
                  </div>
                  <div className="fotocopias-page__form-item">
                      <FilesLibraryManager files={this.state.files}
                                           onChange={this.handleFileLibraryChange} />
                  </div>

                  </div>
                  <div className="fotocopias-page__right-column">

                      <div className="fotocopias-page__form-item">
                        <InputField label={intlStore.getMessage(intlData, 'name')}
                                    onChange={this.handleNameChange}
                                    value={this.state.name}
                                    error={fieldError('name')} />
                      </div>
                      <div className="fotocopias-page__form-item">
                        <InputField label={intlStore.getMessage(intlData, 'copiesnum')}
                                    onChange={this.handleCopiesNumChange}
                                    value={this.state.copiesnum}
                                    error={fieldError('copiesnum')} />
                      </div>
                      <div className="fotocopias-page__form-item">
                        <InputField label={intlStore.getMessage(intlData, 'phone')}
                                    onChange={this.handlePhoneChange}
                                    value={this.state.phone}
                                    error={fieldError('phone')} />
                      </div>

                  </div>
              </div>
              <div className="fotocopias-page__button">
                  <Button type="primary" onClick={this.handleSubmitClick}>
                      <FormattedMessage
                          message={intlStore.getMessage(intlData, 'send')}
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
