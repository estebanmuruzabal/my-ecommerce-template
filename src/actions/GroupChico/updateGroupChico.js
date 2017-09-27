import groupActions from '../../constants/groupChico';

export default function updateGroupChico(context, payload, done) {
   context.dispatch(groupActions.GROUPS_CHICO_ITEM_SAVE);
   context.api.groupChico.update(payload.id, payload.data).then(function successFn(result) {
       context.dispatch(groupActions.GROUPS_CHICO_ITEM_SAVE_SUCCESS, result);
       done && done();
   }, function errorFn(err) {
       context.dispatch(groupActions.GROUPS_CHICO_ITEM_SAVE_ERROR, err.result);
       done && done();
  });
}
