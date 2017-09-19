import applicationActions from '../../constants/application';
import groupActions from '../../constants/groups';

export default function updateGroup(context, payload, done) {
   context.dispatch(groupActions.GROUPS_ITEM_SAVE);
   context.api.groups.update(payload.id, payload.data).then(function successFn(result) {
       context.dispatch(groupActions.GROUPS_ITEM_SAVE_SUCCESS, result);
       done && done();
   }, function errorFn(err) {
       context.dispatch(groupActions.GROUPS_ITEM_SAVE_ERROR, err.result);
       done && done();
  });
}
