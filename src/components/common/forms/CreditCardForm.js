/**
 * Imports
 */
import React from 'react';
import IntlStore from '../../../stores/Application/IntlStore';

import Button from '../buttons/Button';
import InputField from './InputField';
import Select from './Select';

import intlData from './CreditCardForm.intl';

const docTypeOptions = [
    {name: 'DNI', value: 'dni'},
    {name: 'PASSPORT', value: 'passport'}
];

class CreditCardForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
          ccPayload: {
            email: '',
            creditCardNumber: '',
            securityCode: '',
            cardExpirationMonth: '',
            cardExpirationYear: '',
            cardHolderName: '',
            documentType: '',
            documentNumber: '',
          },
          fieldErrors: {},
        }
    }

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    componentDidMount() {
        require('./CreditCardForm.scss');
    }

    handleFieldChange = (field, value) => {
        const payload = this.state.ccPayload;
        payload[field]= value;
        this.setState({ ccPayload: payload });
    };

    handleSubmitClick = () => {

        let intlStore = this.context.getStore(IntlStore);

        // Client-side validations
        let fieldErrors = {};
        const errorFieldTranslation = intlStore.getMessage(intlData, 'fieldRequired');
        if (!this.state.ccPayload.email) { fieldErrors.email = errorFieldTranslation; }
        if (!this.state.ccPayload.creditCardNumber) { fieldErrors.creditCardNumber = errorFieldTranslation; }
        if (!this.state.ccPayload.securityCode) { fieldErrors.securityCode = errorFieldTranslation; }
        if (!this.state.ccPayload.cardExpirationMonth) { fieldErrors.cardExpirationMonth = errorFieldTranslation; }
        if (!this.state.ccPayload.cardExpirationYear) { fieldErrors.cardExpirationYear = errorFieldTranslation; }
        if (!this.state.ccPayload.cardHolderName) { fieldErrors.cardHolderName = errorFieldTranslation; }
        if (!this.state.ccPayload.documentType) { fieldErrors.documentType = errorFieldTranslation; }
        if (!this.state.ccPayload.documentNumber) { fieldErrors.documentNumber = errorFieldTranslation; }

        this.setState({fieldErrors: fieldErrors});

        // Validation passed, trigger request
        if (Object.keys(fieldErrors).length === 0) {
            this.props.handleTestMercadoPagoSubmit(this.state.ccPayload);
        }
    };

    render() {
        const intlStore = this.context.getStore(IntlStore);
        return (
            <div className="address-field">
                <InputField label={intlStore.getMessage(intlData, 'email')}
                        onChange={this.handleFieldChange.bind(null, 'email')}
                        onEnterPress={this.handleSubmitClick}
                        placeholder="Enter Email"
                        error={this.state.fieldErrors['email']} />

                <InputField label={intlStore.getMessage(intlData, 'creditCardNumber')}
                        onChange={this.handleFieldChange.bind(null, 'creditCardNumber')}
                        onEnterPress={this.handleSubmitClick}
                        placeholder="4509 9535 6623 3704"
                        error={this.state.fieldErrors['creditCardNumber']} />

                <InputField label={intlStore.getMessage(intlData, 'securityCode')}
                        onChange={this.handleFieldChange.bind(null, 'securityCode')}
                        onEnterPress={this.handleSubmitClick}
                        placeholder="123"
                        error={this.state.fieldErrors['securityCode']} />

                <InputField label={intlStore.getMessage(intlData, 'cardExpirationMonth')}
                        onChange={this.handleFieldChange.bind(null, 'cardExpirationMonth')}
                        onEnterPress={this.handleSubmitClick}
                        placeholder="123"
                        error={this.state.fieldErrors['cardExpirationMonth']} />

                <InputField label={intlStore.getMessage(intlData, 'cardExpirationYear')}
                        onChange={this.handleFieldChange.bind(null, 'cardExpirationYear')}
                        onEnterPress={this.handleSubmitClick}
                        placeholder="2016"
                        error={this.state.fieldErrors['cardExpirationYear']} />

                <InputField label={intlStore.getMessage(intlData, 'cardHolderName')}
                        onChange={this.handleFieldChange.bind(null, 'cardHolderName')}
                        onEnterPress={this.handleSubmitClick}
                        placeholder="APRO"
                        error={this.state.fieldErrors['cardHolderName']} />

                <Select label={intlStore.getMessage(intlData, 'documentType')}
                    placeholder
                    options={docTypeOptions}
                    labelWeight={this.props.labelWeight}
                    value={this.state.docType}
                    onChange={this.handleFieldChange.bind(null, 'documentType')}
                    error={this.state.fieldErrors['documentType']} />

                <InputField label={intlStore.getMessage(intlData, 'documentNumber')}
                            onChange={this.handleFieldChange.bind(null, 'documentNumber')}
                            onEnterPress={this.handleSubmitClick}
                            placeholder="35693266"
                            error={this.state.fieldErrors['documentNumber']} />

                <Button type="primary"
                        onClick={this.handleSubmitClick}
                        disabled={this.props.disabled}
                        loading={this.props.loading}>
                    {this.props.submitLabel || intlStore.getMessage(intlData, 'submit')}
                </Button>
            </div>
        );
    }
}

export default CreditCardForm;
