import checkoutActions from '../../constants/checkout';

export default function mercadoPagoPay(context, payload, done) {
    context.dispatch(checkoutActions.CHECKOUT_CC_CREATE);
    context.api.checkouts.pay(payload).then(function successFn(result) {
        context.dispatch(checkoutActions.CHECKOUT_CC_CREATE_SUCCESS, result);
        done && done();
    }, function errorFn(err) {
        context.dispatch(checkoutActions.CHECKOUT_CC_CREATE_ERROR, err.result);
        done && done();
    });
}
