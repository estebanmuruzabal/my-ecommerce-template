/**
 * Imports
 */
import React from 'react';
import {FormattedMessage, FormattedNumber} from 'react-intl';

// Flux
import IntlStore from '../../../stores/Application/IntlStore';

// Required components
import AddressField from '../../common/forms/AddressField';
import AddressPreview from '../../common/forms/AddressPreview';
import RadioSelect from '../../common/forms/RadioSelect';
import Heading from '../../common/typography/Heading';
import MapZonesImages from '../../common/MapZonesImages/MapZonesImages';
import InlineItems from '../../common/forms/InlineItems';
import Select from '../../common/forms/Select';

import CheckoutSection from './CheckoutSection';

// Translation data for this component
import intlData from './CheckoutShippingInformation.intl';

// Instantiate logger
let debug = require('debug')('tienda765');

/**
 * Component
 */
class CheckoutShippingInformation extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./CheckoutShippingInformation.scss');
    }

    //*** Template ***//

    render() {

        //
        // Helper methods & variables
        //

        let intlStore = this.context.getStore(IntlStore);

        let shippingOptions = (this.props.shippingOptions) ? this.props.shippingOptions.map(function (option) {
            let name = (
                <FormattedMessage message={intlStore.getMessage(option.name)}
                                  locales={intlStore.getCurrentLocale()} />
            );
            let price = (
                <FormattedNumber
                    value={option.price}
                    style="currency"
                    currency={option.currency} />
            );
            return {
                value: option.value,
                name: name,
                detail: price
            };
        }) : null;

        let dayOptions = [
            {name: 'Lunes', value: 'Lunes'},
            {name: 'Martes', value: 'Martes'},
            {name: 'Miércoles', value: 'Miércoles'},
            {name: 'Jueves', value: 'Jueves'},
            {name: 'Viernes', value: 'Viernes'}
        ];

        let timeOptions = [
            {name: '09:00', value: '09:00'},
            {name: '10:00', value: '10:00'},
            {name: '11:00', value: '11:00'},
            {name: '12:00', value: '12:00'},
            {name: '13:00', value: '13:00'},
            {name: '14:00', value: '14:00'},
            {name: '15:00', value: '15:00'},
            {name: '16:00', value: '16:00'},
            {name: '17:00', value: '17:00'},
            {name: '18:00', value: '18:00'},
            {name: '19:00', value: '19:00'},
            {name: '20:00', value: '20:00'},
            {name: '21:00', value: '21:00'}
        ];

        return (
            <div className="checkout-shipping-information">
                {this.props.editingAddress ?
                    <div className="checkout-shipping-information__content">
                        <AddressField labelWeight="normal"
                                      address={this.props.address}
                                      savedAddresses={this.props.user && this.props.user.addresses}
                                      onSubmit={this.props.onAddressSubmit}
                                      submitLabel={intlStore.getMessage(intlData, 'save')}
                                      loading={this.props.loading} />
                    </div>
                    :
                    <div className="checkout-shipping-information__content">
                        <div className="checkout-shipping-information__address-preview">
                            <AddressPreview address={this.props.address}
                                            onEditClick={this.props.onAddressEditClick} />
                        </div>
                        {shippingOptions ?
                            <div className="checkout-shipping-information__select-method">
                                <CheckoutSection number="2.1"
                                                 size="small"
                                                 title={intlStore.getMessage(intlData, 'shippingMethodLabel')} />
                                <RadioSelect options={shippingOptions}
                                             onChange={this.props.onShippingOptionChange}
                                             value={this.props.shippingMethod} />
                            </div>
                            :
                            null
                        }

                          <div className="checkout-shipping-information__select-method">
                              <InlineItems>
                                  <Select label={intlStore.getMessage(intlData, 'day')}
                                          placeholder
                                          options={dayOptions}
                                          labelWeight={this.props.labelWeight}
                                          value={this.props.shippingDay}
                                          onChange={this.props.handleShippingDayChange} />
                                  <Select label={intlStore.getMessage(intlData, 'time')}
                                          placeholder
                                          options={timeOptions}
                                          labelWeight={this.props.labelWeight}
                                          value={this.props.shippingTime}
                                          onChange={this.props.handleShippingTimeChange} />
                              </InlineItems>
                          </div>
                    </div>
                }
                <div className="checkout-summary__warning">
                    <Heading size="small" align="left">
                        <FormattedMessage message={intlStore.getMessage(intlData, 'aclarationZones')}
                                          locales={intlStore.getCurrentLocale()} />
                    </Heading>
                    <Heading size="small" align="left">
                        <FormattedMessage message={intlStore.getMessage(intlData, 'aclarationShipping')}
                                          locales={intlStore.getCurrentLocale()} />
                    </Heading>
                </div>
            </div>
        );
    }
}

/**
 * Default Props
 */
CheckoutShippingInformation.defaultProps = {
    onAddressSubmit: function (value) { debug(`onAddressSubmit not defined. Value: ${value}`); },
    onAddressEditClick: function () { debug('onAddressEditClick not defined'); },
    onShippingOptionChange: function (value) { debug(`onShippingOptionChange not defined. Value: ${value}`); },
    handleShippingScheduleOptionChange: function (value) { debug(`handleShippingScheduleOptionChange not defined. Value: ${value}`); }
};

/**
 * Exports
 */
export default CheckoutShippingInformation;
