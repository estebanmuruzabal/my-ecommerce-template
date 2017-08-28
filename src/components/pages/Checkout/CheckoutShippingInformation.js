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
import Text from '../../common/typography/Text';
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

    state = {
          showModal: false,
          daysOptions: []
     };

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };


    componentDidMount() {
        require('./CheckoutShippingInformation.scss');
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
          showModal: false,
          daysOptions: []
        });
    }

    handleOpenModalClick = () => {
        this.setState({showModal: true});
    };

    handleCloseModal = () => {
        this.setState({showModal: false});
    };



    //*** Template ***//

    render() {

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

        let takeOutTimeOptions = [
            {name: 'Entre 09:00 y 12:30', value: '09:00-12:30'},
            {name: 'Entre 17:00 y 20:30', value: '17:00-20:30'}
        ];

        let deliveryTimeOptions = [
            {name: 'Entre 07:00 y 09:00', value: '07:00-09:00'},
            {name: 'Entre 09:00 y 11:00', value: '09:00-11:00'},
            {name: 'Entre 11:00 y 13:00', value: '11:00-13:00'},
            {name: 'Entre 13:00 y 15:00', value: '13:00-15:00'},
            {name: 'Entre 15:00 y 17:00', value: '15:00-17:00'},
            {name: 'Entre 17:00 y 19:00', value: '17:00-19:00'},
            {name: 'Entre 19:00 y 21:00', value: '19:00-21:00'},
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

        var showWarningText = () => {
                return (
                  <div>
                    <div className="checkout-summary__warning">
                        <Heading size="small">
                          <FormattedMessage message={intlStore.getMessage(intlData, 'aclarationVerdurasYFotocopias')}
                                            locales={intlStore.getCurrentLocale()} />
                        </Heading>
                    </div>
                    <div className="checkout-summary__warning">
                        <Heading size="small">
                          <FormattedMessage message={intlStore.getMessage(intlData, 'aclarationDefault')}
                                            locales={intlStore.getCurrentLocale()} />
                        </Heading>
                    </div>
                  </div>
                );
        };

        let today = new Date();
        let dayOptions = [];
        let dayOfTheWeek = today.getDay();
        let productSchedule;
        let weekday=new Array(6);
        weekday[0]="Domingo";
        weekday[1]="Lunes";
        weekday[2]="Martes";
        weekday[3]="Miercoles";
        weekday[4]="Jueves";
        weekday[5]="Viernes";
        weekday[6]="Sabado";

        let month=new Array(12);
        month[0]="Enero";
        month[1]="Febrero";
        month[2]="Marzo";
        month[3]="Abril";
        month[4]="Mayo";
        month[5]="Junio";
        month[6]="Julio";
        month[7]="Agosto";
        month[8]="Septiembre";
        month[9]="Octubre";
        month[10]="Noviembre";
        month[11]="Diciembre";

        if (this.props.checkout.cart && this.props.checkout.cart.products.length > 0) {
          this.props.checkout.cart.products.forEach(function (product) {
            if (product.details.tags.indexOf('verduras') !== -1 && productSchedule !== 'cajon') {
              productSchedule = 'verduras';
            }
            if (product.details.tags.indexOf('cajon') !== -1) {
              productSchedule = 'cajon';
            }
          });
        }
            if (productSchedule == 'cajon') {
              for (let i = 0; i < 7 ; i++) {
                let dayOfTheWeek = today.getDay()+i;

                if (dayOfTheWeek == 7) {
                  dayOfTheWeek = 0;
                } else if (dayOfTheWeek == 8){
                  dayOfTheWeek = 1;
                } else if (dayOfTheWeek == 9){
                  dayOfTheWeek = 2;
                } else if (dayOfTheWeek == 10){
                  dayOfTheWeek = 3;
                } else if (dayOfTheWeek == 11){
                  dayOfTheWeek = 4;
                } else if (dayOfTheWeek == 12){
                  dayOfTheWeek = 5;
                } else if (dayOfTheWeek == 13){
                  dayOfTheWeek = 6;
                }

                let todayDay = today.getDate()+i;
                let entireDate = undefined;

                if (dayOfTheWeek == 2) {
                  entireDate = weekday[dayOfTheWeek] + ' ' + todayDay + ' de ' + month[today.getMonth()];
                  dayOptions.push({name: entireDate, value: entireDate});
                }
             }
           } else if (productSchedule == 'verduras') {

              for (let i = 0; i < 7 ; i++) {
                let dayOfTheWeek = today.getDay()+i;
                let todayDay = today.getDate()+i;
                let entireDate = undefined;

                if (dayOfTheWeek == 7) {
                  dayOfTheWeek = 0;
                } else if (dayOfTheWeek == 8){
                  dayOfTheWeek = 1;
                } else if (dayOfTheWeek == 9){
                  dayOfTheWeek = 2;
                } else if (dayOfTheWeek == 10){
                  dayOfTheWeek = 3;
                } else if (dayOfTheWeek == 11){
                  dayOfTheWeek = 4;
                } else if (dayOfTheWeek == 12){
                  dayOfTheWeek = 5;
                } else if (dayOfTheWeek == 13){
                  dayOfTheWeek = 6;
                }

                if (today.getHours() >= 17 && todayDay == today.getDate()) {
                } else if (today.getHours() >= 17 && todayDay == today.getDate()+1) {
                } else if (dayOfTheWeek !== 0 && dayOfTheWeek !== 6) {
                  entireDate = weekday[dayOfTheWeek] + ' ' + todayDay + ' de ' + month[today.getMonth()];
                  dayOptions.push({name: entireDate, value: entireDate});
                }
             }
           } else {
              for (let i = 0; i < 7 ; i++) {
                let dayOfTheWeek = today.getDay()+i;
                let todayDay = today.getDate()+i;
                let entireDate = undefined;

                if (dayOfTheWeek == 7) {
                  dayOfTheWeek = 0;
                } else if (dayOfTheWeek == 8){
                  dayOfTheWeek = 1;
                } else if (dayOfTheWeek == 9){
                  dayOfTheWeek = 2;
                } else if (dayOfTheWeek == 10){
                  dayOfTheWeek = 3;
                } else if (dayOfTheWeek == 11){
                  dayOfTheWeek = 4;
                } else if (dayOfTheWeek == 12){
                  dayOfTheWeek = 5;
                } else if (dayOfTheWeek == 13){
                  dayOfTheWeek = 6;
                }

                if (todayDay !== today.getDate() && dayOfTheWeek !== 0 && dayOfTheWeek !== 6) {
                  entireDate = weekday[dayOfTheWeek] + ' ' + todayDay + ' de ' + month[today.getMonth()];
                  dayOptions.push({name: entireDate, value: entireDate});
                }
             }
            }

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
                            <div className="checkout-shipping-information__select-method">
                                <CheckoutSection number="2.2"
                                               size="small"
                                               title={intlStore.getMessage(intlData, 'takeoutDateLabel')}>
                                <InlineItems>
                                    <Select label={intlStore.getMessage(intlData, 'day')}
                                            placeholder
                                            options={dayOptions}
                                            labelWeight={this.props.labelWeight}
                                            value={this.props.shippingDay}
                                            onChange={this.props.handleShippingDayChange} />
                                    <Select label={intlStore.getMessage(intlData, 'time')}
                                            placeholder
                                            options={takeOutTimeOptions}
                                            labelWeight={this.props.labelWeight}
                                            value={this.props.shippingTime}
                                            onChange={this.props.handleShippingTimeChange} />
                                    </InlineItems>
                                  </CheckoutSection>
                            </div>
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
                                            options={deliveryTimeOptions}
                                            labelWeight={this.props.labelWeight}
                                            value={this.props.shippingTime}
                                            onChange={this.props.handleShippingTimeChange} />
                                    </InlineItems>
                                  </CheckoutSection>
                            </div>
                        }
                        {showWarningText()}
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
