import groupActions from '../../constants/groups';

export default function fetchGroups(context, payload, done) {
   context.dispatch(groupActions.GROUPS_FIND);
   context.api.groups.find(payload).then(function successFn(result) {
       context.dispatch(groupActions.GROUPS_FIND_SUCCESS, result);
       done && done();
   }, function errorFn(err) {
       context.dispatch(groupActions.GROUPS_FIND_ERROR, err.result);
       done && done();
   });
}
