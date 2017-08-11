import applicationActions from '../../constants/application';
import groupActions from '../../constants/groups';

export default function updateGroup(context, payload, done) {
    context.dispatch(groupActions.GROUPS_ITEM_SAVE);
    context.api.groupActions.update(payload.id, payload.data).then(function successFn(result) {
        context.dispatch(groupActions.GROUPS_ITEM_SAVE_SUCCESS, result);
        context.dispatch(applicationActions.APPLICATION_POST_NOTIFICATION, {
            type: 'success',
            message: 'Saved'
        });
        done && done();
    }, function errorFn(err) {
        context.dispatch(groupActions.GROUPS_ITEM_SAVE_ERROR, err.result);
        context.dispatch(applicationActions.APPLICATION_POST_NOTIFICATION, {
            type: 'error',
            message: 'Unable to save'
        });
        done && done();
    });
}
