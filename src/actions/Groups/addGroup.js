import groupActions from '../../constants/groups';

export default function addGroup(context, payload, done) {
   context.dispatch(groupActions.GROUPS_ADD);
   context.api.groups.create(payload).then(function successFn(result) {
       context.dispatch(groupActions.GROUPS_ADD_SUCCESS, result);
       done && done();
   }, function errorFn(err) {
       context.dispatch(groupActions.GROUPS_ADD_ERROR, err.result);
      done && done();
   });
 }
