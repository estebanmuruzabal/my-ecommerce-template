import groupActions from '../../constants/groupMediano';

export default function updateGroupMediano(context, payload, done) {
   context.dispatch(groupActions.GROUPS_MEDIANO_ITEM_SAVE);
   context.api.groupMediano.update(payload.id, payload.data).then(function successFn(result) {
       context.dispatch(groupActions.GROUPS_MEDIANO_ITEM_SAVE_SUCCESS, result);
       done && done();
   }, function errorFn(err) {
       context.dispatch(groupActions.GROUPS_MEDIANO_ITEM_SAVE_ERROR, err.result);
       done && done();
  });
}
