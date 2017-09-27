import groupActions from '../../constants/groupChico';

export default function addGroupChico(context, payload, done) {
   context.dispatch(groupActions.GROUPS_CHICO_ADD);
   context.api.groupChico.create(payload).then(function successFn(result) {
       context.dispatch(groupActions.GROUPS_CHICO_ADD_SUCCESS, result);
       done && done();
   }, function errorFn(err) {
       context.dispatch(groupActions.GROUPS_CHICO_ADD_ERROR, err.result);
      done && done();
   });
 }
