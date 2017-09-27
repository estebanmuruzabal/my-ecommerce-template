import groupActions from '../../constants/groupChico';

export default function fetchGroupChico(context, payload, done) {
    context.dispatch(groupActions.GROUPS_CHICO_ITEM);
    context.api.groupChico.get(payload).then(function successFn(result) {
        context.dispatch(groupActions.GROUPS_CHICO_ITEM_SUCCESS, result);
        done && done();
    }, function errorFn(err) {
        context.dispatch(groupActions.GROUPS_CHICO_ITEM_ERROR, err.result);
        done && done();
    });
}
