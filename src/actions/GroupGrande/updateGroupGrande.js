import groupActions from '../../constants/groupGrande';

export default function updateGroupGrande(context, payload, done) {
   context.dispatch(groupActions.GROUPS_GRANDE_ITEM_SAVE);
   context.api.groupGrande.update(payload.id, payload.data).then(function successFn(result) {
       context.dispatch(groupActions.GROUPS_GRANDE_ITEM_SAVE_SUCCESS, result);
       done && done();
   }, function errorFn(err) {
       context.dispatch(groupActions.GROUPS_GRANDE_ITEM_SAVE_ERROR, err.result);
       done && done();
  });
}
