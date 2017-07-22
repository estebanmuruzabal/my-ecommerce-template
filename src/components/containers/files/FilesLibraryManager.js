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



        this.setState({
            fileUpload: nextProps._fileUpload
        });
    }

    //*** View Controllers ***//

    handleImageSubmit = (file) => {
        this.context.executeAction(uploadFile, {
            resource: 'copies',
            file: file
        });
    };

    //*** Template ***//

    render() {
        let intlStore = this.context.getStore(IntlStore);
        return (
            <div className="image-library-manager">
                <div className="image-library-manager__gallery">
                    <div className="image-library-manager__upload">
                        <FileUpload onSubmit={this.handleImageSubmit}
                                     disabled={this.state.fileUpload.loading} />
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
