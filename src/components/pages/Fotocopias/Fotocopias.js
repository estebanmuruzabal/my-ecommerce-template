import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router';

// Flux
import IntlStore from '../../../stores/Application/IntlStore';
import createCopies from '../../../actions/Fotocopias/createCopies';

import FotocopiasAddForm from './FotocopiasAddForm';

// Required components
import Button from '../../common/buttons/Button';
import Checkbox from '../../common/forms/Checkbox';

import Heading from '../../common/typography/Heading';
import FilesLibraryManager from '../../containers/files/FilesLibraryManager';
import InlineItems from '../../common/forms/InlineItems';
import InputField from '../../common/forms/InputField';
import NotFound from '../NotFound/NotFound';
import Select from '../../common/forms/Select';
import Textarea from '../../common/forms/Textarea';
import ToggleSwitch from '../../common/buttons/ToggleSwitch';

// Translation data for this component
import intlData from './Fotocopias.intl';

/**
 * Component
 */
class Fotocopias extends React.Component {

    static contextTypes = {
        executeAction: React.PropTypes.func.isRequired,
        getStore: React.PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        copies: {},
        fieldErrors: {},
        loading: false
    };

    //*** Component Lifecycle ***//

    componentDidMount() {
      require('./Fotocopias.scss');
    }

    handleCreateCopiesSubmitClick = (data) => {
        this.context.executeAction(createCopies, data);
    };

    render() {

      let intlStore = this.context.getStore(IntlStore);

        return (
          <div>
            <div className="fotocopias-page__header">
                <div className="fotocopias-page__title">
                    <Heading size="medium">
                        <FormattedMessage
                            message={intlStore.getMessage(intlData, 'title')}
                            locales={intlStore.getCurrentLocale()} />
                    </Heading>
                </div>
            </div>
            <FotocopiasAddForm onSubmitClick={this.handleCreateCopiesSubmitClick} />
          </div>
        );
    }
}

/**
 * Exports
 */
export default Fotocopias;
