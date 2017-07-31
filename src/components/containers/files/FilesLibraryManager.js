/**
 * Imports
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import {FormattedMessage} from 'react-intl';

// Flux
import FileUploadStore from '../../../stores/Files/FileUploadStore';

import IntlStore from '../../../stores/Application/IntlStore';

import uploadFile from '../../../actions/Admin/uploadFile';

// Required components
import FormLabel from '../../common/forms/FormLabel';
import FileUpload from '../../common/files/FileUpload';
import FileLibrary from '../../common/files/FileLibrary';


// Translation data for this component
import intlData from './FilesLibraryManager.intl';

// Instantiate logger
let debug = require('debug')('tienda765');

/**
 * Component
 */
class FilesLibraryManager extends React.Component {

    static contextTypes = {
        executeAction: React.PropTypes.func.isRequired,
        getStore: React.PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        fileUpload: this.context.getStore(FileUploadStore).getState(),
        fieldErrors: {}
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        require('./FilesLibraryManager.scss');
    }

    componentWillReceiveProps(nextProps) {

        let fieldErrors = {};
        if (nextProps._error && nextProps._error.validation && nextProps._error.validation.keys) {
            nextProps._error.validation.keys.forEach(function (field) {
                fieldErrors[field] = nextProps._error.validation.details[field];
            });
        }

        // Check if a file was uploaded
        if (this.state.fileUpload.loading && !nextProps._fileUpload.loading && !nextProps._fileUpload.error) {
            let files = this.props.files;
            files.push(nextProps._fileUpload.file);
            this.props.onChange(files);
        }

        this.setState({
            fileUpload: nextProps._fileUpload,
            fieldErrors: fieldErrors
        });
    }

    //*** View Controllers ***//

    handleFileSubmit = (files) => {
        this.context.executeAction(uploadFile, {
            resource: 'copies',
            file: files
        });
    };

    //*** Template ***//

    render() {
        let intlStore = this.context.getStore(IntlStore);
        return (
            <div className="file-library-manager">
                <div className="file-library-manager__gallery">
                    <div className="file-library-manager__upload">
                        <FileUpload onSubmit={this.handleFileSubmit}
                                     disabled={this.state.fileUpload.loading} />
                    </div>
                    <div className="file-library-manager__images">
                        <FileLibrary files={this.props.files}
                                      onChange={this.props.onChange} />
                    </div>
                </div>
            </div>
        );
    }
}


/**
 * Flux
 */
FilesLibraryManager = connectToStores(FilesLibraryManager, [FileUploadStore], (context) => {
    return {
        _fileUpload: context.getStore(FileUploadStore).getState()
    };
});

/**
 * Exports
 */
export default FilesLibraryManager;
