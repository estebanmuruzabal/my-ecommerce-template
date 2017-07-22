/**
 * Imports
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router';

// Flux
import IntlStore from '../../../stores/Application/IntlStore';
import uploadFile from '../../../actions/Admin/uploadFile';

// Required components
import Button from '../../common/buttons/Button';
import Heading from '../../common/typography/Heading';
import Label from '../../common/indicators/Label';
import Modal from '../../common/modals/Modal';
import Spinner from '../../common/indicators/Spinner';
import StatusIndicator from '../../common/indicators/StatusIndicator';
import Table from '../../common/tables/Table';
import Text from '../../common/typography/Text';

import FotocopiasAddForm from './FotocopiasAddForm';
import FotocopiasUpload from './FotocopiasUpload';
import FilesLibraryManager from '../../containers/files/FilesLibraryManager';

// Translation data for this component
import intlData from './Fotocopias.intl';

/**
 * Component
 */
class Fotocopias extends React.Component {

    static contextTypes = {
        executeAction: React.PropTypes.func.isRequired,
        getStore: React.PropTypes.func.isRequired,
        router: React.PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {

    };

    //*** Component Lifecycle ***//

    componentDidMount() {
        // Component styles
        require('./Fotocopias.scss');
    }


    //*** View Controllers ***//

    // Upload Modal

    handleUploadSubmitClick = (file) => {
        this.context.executeAction(uploadFile, {
            resource: 'copies',
            file: file
        });
    };


    //*** Template ***//

    render() {

        let intlStore = this.context.getStore(IntlStore);
        let routeParams = {locale: this.context.getStore(IntlStore).getCurrentLocale()}; // Base route params

        return (
            <div className="fotocopias-page">

                <div className="fotocopias-page__header">
                    <div className="fotocopias-page__title">
                        <Heading size="medium">
                            <FormattedMessage
                                message={intlStore.getMessage(intlData, 'title')}
                                locales={intlStore.getCurrentLocale()} />
                        </Heading>
                    </div>

                    <div className="admin-collection-edit__form-item">
                      <FilesLibraryManager />
                    </div>


                </div>

            </div>
        );
    }
}

export default Fotocopias;
