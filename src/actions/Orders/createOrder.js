/**
 * Imports
 */
import ga from 'react-ga';

// Flux
import CheckoutStore from '../../stores/Checkout/CheckoutStore';
import AccountStore from '../../stores/Account/AccountStore';
import CollectionsStore from '../../stores/Collections/CollectionsStore';
import IntlStore from '../../stores/Application/IntlStore';
import orderActions from '../../constants/orders';

//Product update
import updateProduct from '../../actions/Admin/updateProduct';
import fetchProduct from '../../actions/Products/fetchProduct';
import fetchProductAndCheckIfFound from '../../actions/Products/fetchProductAndCheckIfFound';
import ProductDetailsStore from '../../stores/Products/ProductDetailsStore';
import sendOrderEmail from '../../actions/Orders/sendOrderEmail';

import config from '../../config';

// Instantiate logger
let debug = require('debug')('tienda765');

/**
 * Create a new order
 */
export default function createOrder(context, payload, done) {
    context.dispatch(orderActions.ORDER_CREATE);
    context.api.orders.create(payload.checkoutId, payload.cartAccessToken).then(function orderCreateSuccess(order) {

        function dispatchOrderCreatedSuccessfullyAndUpdateStocks() {

            let checkout = context.getStore(CheckoutStore).getCheckout();
            let user = context.getStore(AccountStore).getAccountDetails();
            // Send hit to Google Analytics
            try {
                checkout.cart.products.forEach(function (product) {
                    let categoryName;
                    if (product.details.metadata.mainCollection) {
                        let collection = context.getStore(CollectionsStore).getCollection(product.details.metadata.mainCollection);
                        categoryName = context.getStore(IntlStore).getMessage(collection.name);
                    }
                    ga.plugin.execute('set', '&cu', product.details.pricing.currency);
                    ga.plugin.execute('ec', 'addProduct', {
                        id: product.id,
                        name: context.getStore(IntlStore).getMessage(product.details.name),
                        category: categoryName,
                        price: product.details.pricing.retail,
                        quantity: product.quantity
                    });

                    //update stock of product
                    try {
                      let newProductStockNum = product.details.stock - product.quantity;
                      context.executeAction(updateProduct, {
                          id: product.id,
                          data: {
                              enabled: product.details.enabled,
                              sku: product.details.sku,
                              name: product.details.name,
                              description: product.details.description,
                              images: product.details.images,
                              pricing: {
                                  currency: product.details.pricing.currency,
                                  list: parseFloat(product.details.pricing.list),
                                  retail: parseFloat(product.details.pricing.retail),
                                  vat: parseInt(product.details.pricing.vat)
                              },
                              stock: parseInt(newProductStockNum),
                              tags: product.details.tags,
                              collections: product.details.collections,
                              metadata: product.details.metadata
                          }
                      });
                    } catch (err) {
                        debug('Unable update stock of product', err);
                    }
                });
                ga.plugin.execute('ec', 'setAction', 'purchase', {
                    id: order.id,
                    revenue: checkout.total,
                    tax: checkout.vatTotal,
                    shipping: checkout.shippingOptions.find(opt => opt.value === checkout.shippingMethod).price
                });
                ga.plugin.execute('send', 'pageview');
            } catch (err) {
                debug('Unable to send hit to Google Analytics', err);
            }

            let subject = 'Pedido ' + order.id;

            if (checkout.customer) {
              if (checkout.paymentMethod == 'cash') {
                console.log(checkout.customer.email);
                context.executeAction(sendOrderEmail,
                  {orderId: order.id,
                    data: {
                      template: 'order.created',
                      email: checkout.customer.email,
                      subject: subject,
                      paymentlink: ''
                    }
                  });
                  context.executeAction(sendOrderEmail,
                    {orderId: order.id,
                      data: {
                        template: 'order.created',
                        email: 'estebannmuruzabal@gmail.com',
                        subject: subject + 'Cash',
                        paymentlink: ''
                      }
                    });
              }
            } else if (user) {
              if (checkout.paymentMethod == 'cash') {
                context.executeAction(sendOrderEmail,
                  {orderId: order.id,
                    data: {
                      template: 'order.created',
                      email: user.email,
                      subject: subject,
                      paymentlink: ''
                    }
                  });
                  context.executeAction(sendOrderEmail,
                    {orderId: order.id,
                      data: {
                        template: 'order.created',
                        email: 'estebannmuruzabal@gmail.com',
                        subject: subject + 'Cash',
                        paymentlink: ''
                      }
                    });
              }
            } else {
              context.executeAction(sendOrderEmail,
                {orderId: order.id,
                  data: {
                    template: 'order.created',
                    email: 'estebannmuruzabal@gmail.com',
                    subject: subject + 'CC',
                    paymentlink: ''
                  }
                });
            }

            // Send hit to Facebook Pixel
            try {
                fbq('track', 'Purchase', {
                    value: checkout.total,
                    currency: checkout.currency
                });
            } catch (err) {
                debug('Unable to send hit to Facebook Pixel', err);
            }

            // Dispatch action and execute callback
            context.dispatch(orderActions.ORDER_CREATE_SUCCESS, order);
            done && done();
        }

        dispatchOrderCreatedSuccessfullyAndUpdateStocks();


    }, function orderCreateError(orderErr) {
        context.dispatch(orderActions.ORDER_CREATE_ERROR, orderErr.result);
        done && done();
    });
}
