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

import {FormattedMessage} from 'react-intl';

class FileUpload extends React.Component {

    static contextTypes = {
        executeAction: React.PropTypes.func.isRequired,
        getStore: React.PropTypes.func.isRequired
    };

    state = {
      files: undefined,
      image: undefined,
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        require('./FileUpload.scss');

        this.setState({
            image: require('./image_placeholder.png')
        });
    }

    //*** View Controllers ***//

    handlePlaceholderClick = () => {
        this.refs.input.getDOMNode().click();
    };

    handleFileChange = (evt) => {
        this.setState({files: evt.target.files[0]});
    };


    handleSubmitClick = () => {
          this.props.onSubmit(this.state.files);
    };

    handleFileChange = (evt) => {
        let files = evt.target.files[0];
        var reader = new FileReader();
        // let img = new Image();
        // img = require('./file_image.png'):
        // this.setState({image: img});

        reader.readAsDataURL(files);
        this.setState({files: files});
    };


    //*** Template ***//

    render() {
      let intlStore = this.context.getStore(IntlStore);
      let routeParams = {locale: this.context.getStore(IntlStore).getCurrentLocale()}; // Base route params

        return (
            <div className="file-upload">
                <input ref="input" type="file" className="file-upload__input" onChange={this.handleFileChange} />
                <div className="file-upload__placeholder" onClick={this.handlePlaceholderClick}>
                    <img src={this.state.image} />
                </div>
                <div className="file-upload__actions">
                    <Button type="primary" disabled={this.props.disabled === true || !this.state.files} onClick={this.handleSubmitClick}>
                        Upload
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
    onSubmit: function (files) { debug('onSubmit not defined.', files); }
};

/**
 * Exports
 */
export default FileUpload;
