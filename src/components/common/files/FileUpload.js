/**
 * Imports
 */
import React from 'react';

// Required components
import Button from '../buttons/Button';

// Instantiate logger
let debug = require('debug')('tienda765');

import IntlStore from '../../../stores/Application/IntlStore';
import intlData from './FileUpload.intl';

/**
 * Component
 */
class FileUpload extends React.Component {

    static contextTypes = {
        executeAction: React.PropTypes.func.isRequired,
        getStore: React.PropTypes.func.isRequired
    };

    state = {
        file: undefined,
        fieldErrors: {}
    };

    //*** Component Lifecycle ***//

    componentDidMount() {
        // Component styles
        require('./FileUpload.scss');
    }

    //*** View Controllers ***//

    handlePlaceholderClick = () => {
        this.refs.input.getDOMNode().click();
    };

    handleFileChange = (evt) => {
        let file = evt.target.files[0];

        var reader = new FileReader();

        reader.readAsDataURL(file);
        this.setState({file: file});

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
      let intlStore = this.context.getStore(IntlStore);
      let routeParams = {locale: this.context.getStore(IntlStore).getCurrentLocale()}; // Base route params

        return (
            <div className="image-upload">

              <div className="fotocopias-page-upload__form-item">
                  <input ref="input" type="file" className="fotocopias-page-upload__input" onChange={this.handleFileChange} />
                  {this.state.fieldErrors.file ?
                      <div className="fotocopias-page-upload__error">
                          <Text size="small">{this.state.fieldErrors.file}</Text>
                      </div>
                      :
                      null
                  }
              </div>

              <div className="image-upload__actions">
                  <Button type="primary" onClick={this.handleSubmitClick}>
                      Subir
                  </Button>
              </div>

            </div>
        );
    }
}

/**
 * Default Props
 */
FileUpload.defaultProps = {
    onSubmit: function (file) { debug('onSubmit not defined.', file); }
};

/**
 * Exports
 */
export default FileUpload;
