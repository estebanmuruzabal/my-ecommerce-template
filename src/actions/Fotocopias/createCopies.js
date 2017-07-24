import copiesActions from '../../constants/copies';

export default function createCopies(context, payload, done) {
    context.dispatch(copiesActions.COPIES_ADD);
    context.api.copies.create(payload).then(function successFn(result) {
        context.dispatch(copiesActions.COPIES_ADD_SUCCESS, result);
        done && done();
    }, function errorFn(err) {
        context.dispatch(copiesActions.COPIES_ADD_ERROR, err.result);
        done && done();
    });
}
