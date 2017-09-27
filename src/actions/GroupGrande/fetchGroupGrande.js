import groupActions from '../../constants/groupGrande';

export default function fetchGroupGrande(context, payload, done) {
    context.dispatch(groupActions.GROUPS_GRANDE_ITEM);
    context.api.groupGrande.get(payload).then(function successFn(result) {
        context.dispatch(groupActions.GROUPS_GRANDE_ITEM_SUCCESS, result);
        done && done();
    }, function errorFn(err) {
        context.dispatch(groupActions.GROUPS_GRANDE_ITEM_ERROR, err.result);
        done && done();
    });
}
