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
import InlineItems from '../../common/forms/InlineItems';
import Select from '../../common/forms/Select';
import Modal from '../../common/modals/Modal';

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

    state = {
        showModal: false
    };
    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./CheckoutShippingInformation.scss');
    }

    handleOpenModalClick = () => {
        this.setState({showModal: true});
    };

    handleCloseModal = () => {
        this.setState({showModal: false});
    };

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
            {name: 'Lunes 7 Agosto', value: 'Lunes 7 Agosto'},
            {name: 'Martes 8 Agosto', value: 'Martes 8 Agosto'},
            {name: 'Miércoles 9 Agosto', value: 'Miércoles 9 Agosto'},
            {name: 'Jueves 10 Agosto', value: 'Jueves 10 Agosto'},
            {name: 'Viernes 11 Agosto', value: 'Viernes 11 Agosto'}
        ];

        let timeOptions = [
            {name: 'Entre 09:00 y 10:00', value: '09:00-10:00'},
            {name: 'Entre 10:00 y 11:00', value: '10:00-11:00'},
            {name: 'Entre 11:00 y 12:00', value: '11:00-12:00'},
            {name: 'Entre 12:00 y 13:00', value: '12:00-13:00'},
            {name: 'Entre 13:00 y 14:00', value: '13:00-14:00'},
            {name: 'Entre 14:00 y 15:00', value: '14:00-15:00'},
            {name: 'Entre 15:00 y 16:00', value: '15:00-16:00'},
            {name: 'Entre 16:00 y 17:00', value: '16:00-17:00'},
            {name: 'Entre 17:00 y 18:00', value: '17:00-18:00'},
            {name: 'Entre 18:00 y 19:00', value: '18:00-19:00'},
            {name: 'Entre 19:00 y 20:00', value: '19:00-20:00'},
            {name: 'Entre 20:00 y 21:00', value: '20:00-21:00'}
        ];

        let showModal = () => {
            if (this.state.showModal === true) {
                return (
                    <Modal title={intlStore.getMessage(intlData, 'modalTitle')}
                            onCloseClick={this.handleCloseModal}>
                      <iframe src="https://www.google.com/maps/d/embed?mid=1D5L1sLC-E3JYa5ix8gSt3uPOEUU" width="480" height="480"></iframe>
                    </Modal>
                );
            }
        };

        return (
            <div className="checkout-shipping-information">
              {showModal()}
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
                              <div className="checkout-shipping-information__column">
                                  <div className="checkout-shipping-information__row">
                                    <CheckoutSection number="2.1"
                                                   size="small"
                                                   title={intlStore.getMessage(intlData, 'shippingMethodLabel')}>
                                       <RadioSelect options={shippingOptions}
                                                    onChange={this.props.onShippingOptionChange}
                                                    value={this.props.shippingMethod} />
                                    </CheckoutSection>
                                   </div>
                                   <div className="checkout-shipping-information__row">
                                       <div className="image-zone-image-container" onClick={this.handleOpenModalClick}>
                                         <div className="image-shipping-zones"></div>
                                       </div>
                                   </div>
                              </div>
                            </div>
                            :
                            null
                        }

                        {this.props.shippingMethod === 'free-pickup' ?
                            null
                            :
                            <div className="checkout-shipping-information__select-method">
                                <CheckoutSection number="2.2"
                                               size="small"
                                               title={intlStore.getMessage(intlData, 'shippingDateLabel')}>
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
                                </CheckoutSection>
                            </div>
                        }
                    </div>
                }
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
