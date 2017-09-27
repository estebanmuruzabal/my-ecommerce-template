import groupActions from '../../constants/groupMediano';

export default function addGroupMediano(context, payload, done) {
   context.dispatch(groupActions.GROUPS_MEDIANO_ADD);
   context.api.groupMediano.create(payload).then(function successFn(result) {
       context.dispatch(groupActions.GROUPS_MEDIANO_ADD_SUCCESS, result);
       done && done();
   }, function errorFn(err) {
       context.dispatch(groupActions.GROUPS_MEDIANO_ADD_ERROR, err.result);
      done && done();
   });
 }
