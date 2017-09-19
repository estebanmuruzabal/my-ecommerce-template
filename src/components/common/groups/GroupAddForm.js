/**
 * Imports
 */
import React from 'react';
import {FormattedMessage} from 'react-intl';

// Flux
import IntlStore from '../../../stores/Application/IntlStore';

// Required components
import Button from '../../common/buttons/Button';
import InputField from '../../common/forms/InputField';
import Select from '../../common/forms/Select';

// Translation data for this component
import intlData from './GroupAddForm.intl';

// Instantiate debugger
let debug = require('debug')('tienda765');

/**
 * Component
 */
class GroupAddForm extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        name: {en: '', es: ''},
        tags: [],
        buyers: [],
        fieldErrors: {}
    };

    //*** Component Lifecycle ***//

    componentDidMount() {
        require('./GroupAddForm.scss');
    }

    //*** View Controllers ***//

    handleNameChange = (locale, value) => {
        let name = this.state.name;
        name[locale] = value;
        this.setState({name: name});
    };

    handleSubmitClick = () => {
        let intlStore = this.context.getStore(IntlStore);

        this.setState({fieldErrors: {}});
        let fieldErrors = {};
        if (!this.state.tags) {
            fieldErrors.type = intlStore.getMessage(intlData, 'fieldRequired');
        }
        if (!this.state.name.en) {
            fieldErrors.nameEN = intlStore.getMessage(intlData, 'fieldRequired');
        }
        if (!this.state.name.es) {
            fieldErrors.nameES = intlStore.getMessage(intlData, 'fieldRequired');
        }
        this.setState({fieldErrors: fieldErrors});

        if (Object.keys(fieldErrors).length === 0) {
            this.props.onSubmitClick({
                name: this.state.name,
                buyers: this.state.buyers,
                tags: this.state.tags
            });
        }
    };

    handleTypeChange = (value) => {
        this.setState({tags: [value]});
    };

    //*** Template ***//

    render() {

        let intlStore = this.context.getStore(IntlStore);

        let groupTypeOptions = [
            {name: intlStore.getMessage(intlData, 'cajonchico'), value: 'Cajón Chico'},
            {name: intlStore.getMessage(intlData, 'cajonmediano'), value: 'Cajón Mediano'},
            {name: intlStore.getMessage(intlData, 'cajongrande'), value: 'Cajón Grande'}
        ];

        let fieldError = (field) => {
            return this.state.fieldErrors[field];
        };

        return (
            <div className="group-add-form">
                <div className="group-add-form__item">
                    <Select label={intlStore.getMessage(intlData, 'type')}
                            placeholder
                            options={groupTypeOptions}
                            onChange={this.handleTypeChange}
                            error={fieldError('type')} />
                </div>
                <div className="group-add-form__item">
                    <InputField label={intlStore.getMessage(intlData, 'name') + ' (EN)'}
                                onChange={this.handleNameChange.bind(null, 'en')}
                                error={fieldError('nameEN')} />
                </div>
                <div className="group-add-form__item">
                    <InputField label={intlStore.getMessage(intlData, 'name') + ' (ES)'}
                                onChange={this.handleNameChange.bind(null, 'es')}
                                error={fieldError('nameES')} />
                </div>
                <div className="group-add-form__actions">
                    <div className="group-add-form__button">
                        <Button type="default" onClick={this.props.onCancelClick}>
                            <FormattedMessage
                                message={intlStore.getMessage(intlData, 'cancel')}
                                locales={intlStore.getCurrentLocale()} />
                        </Button>
                    </div>
                    <div className="group-add-form__button">
                        <Button type="primary" onClick={this.handleSubmitClick}>
                            <FormattedMessage
                                message={intlStore.getMessage(intlData, 'add')}
                                locales={intlStore.getCurrentLocale()} />
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Default Props
 */
GroupAddForm.defaultProps = {
    onCancelClick: function () { debug('onCancelClick not defined'); },
    onSubmitClick: function (data) { debug(`onSubmitClick not defined. Value: ${data}`); }
};

/**
 * Exports
 */
export default GroupAddForm;
