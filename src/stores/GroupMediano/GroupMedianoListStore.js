/**
* Imports
*/
import BaseStore from 'fluxible/addons/BaseStore';
import groupActions from '../../constants/groupMediano';

/**
* Store
*/
class GroupMedianoListStore extends BaseStore {

   static storeName = 'GroupMedianoListStore';

   static handlers = {
       [groupActions.GROUPS_MEDIANO_FIND]: 'handleListRequest',
       [groupActions.GROUPS_MEDIANO_FIND_SUCCESS]: 'handleListSuccess',
       [groupActions.GROUPS_MEDIANO_FIND_ERROR]: 'handleListError'
   };

   constructor(dispatcher) {
       super(dispatcher);
       this.loading = false;
       this.error = undefined;
       this.groups = undefined;
   }

   getState() {
       return {
           loading: this.loading,
           error: this.error,
           groups: this.groups
       }
   }

   //
   // Isomorphic stuff
   //

   dehydrate() {
       return this.getState();
   }

   rehydrate(state) {
       this.loading = state.loading;
       this.error = state.error;
       this.groups = state.groups;
   }

   //
   // Getters
   //

   isLoading() {
       return this.loading === true;
   }

   getError() {
       return this.error;
   }

   getGroups() {
       if (this.groups && this.groups.items) {
           return this.groups.items;
       } else {
           return [];
       }
   }

   //
   // Handlers
   //

   handleListRequest() {
       this.loading = true;
       this.emitChange();
   }

   handleListSuccess(payload) {
       this.loading = false;
       this.error = null;
       this.groups = payload;
       this.emitChange();
   }

   handleListError(payload) {
       this.loading = false;
       this.error = payload;
       this.emitChange();
   }
}

/**
* Export
*/
export default GroupMedianoListStore;
