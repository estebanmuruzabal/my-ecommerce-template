import groupActions from '../../constants/groupGrande';

export default function addGroupGrande(context, payload, done) {
   context.dispatch(groupActions.GROUPS_GRANDE_ADD);
   context.api.groupGrande.create(payload).then(function successFn(result) {
       context.dispatch(groupActions.GROUPS_GRANDE_ADD_SUCCESS, result);
       done && done();
   }, function errorFn(err) {
       context.dispatch(groupActions.GROUPS_GRANDE_ADD_ERROR, err.result);
      done && done();
   });
 }
