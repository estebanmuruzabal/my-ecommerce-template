import groupActions from '../../constants/groupMediano';

export default function fetchGroupMediano(context, payload, done) {
    context.dispatch(groupActions.GROUPS_MEDIANO_ITEM);
    context.api.groupMediano.get(payload).then(function successFn(result) {
        context.dispatch(groupActions.GROUPS_MEDIANO_ITEM_SUCCESS, result);
        done && done();
    }, function errorFn(err) {
        context.dispatch(groupActions.GROUPS_MEDIANO_ITEM_ERROR, err.result);
        done && done();
    });
}
