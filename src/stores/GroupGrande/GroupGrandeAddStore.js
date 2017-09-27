/**
* Imports
*/
import BaseStore from 'fluxible/addons/BaseStore';
import groupActions from '../../constants/groupGrande';

/**
* Store
*/
class GroupGrandeAddStore extends BaseStore {

   static storeName = 'GroupGrandeAddStore';

   static handlers = {
       [groupActions.GROUPS_GRANDE_ADD]: 'handleAddRequest',
       [groupActions.GROUPS_GRANDE_ADD_SUCCESS]: 'handleAddSuccess',
       [groupActions.GROUPS_GRANDE_ADD_ERROR]: 'handleAddError'
   };

   constructor(dispatcher) {
       super(dispatcher);
       this.loading = false;
       this.error = undefined;
       this.group = undefined;
   }

   getState() {
       return {
           loading: this.loading,
           error: this.error,
           group: this.group
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
       this.group = state.group;
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

   getGroup() {
       return this.group;
   }

   //
   // Handlers
   //

   handleAddRequest() {
       this.loading = true;
       this.emitChange();
   }

   handleAddSuccess(payload) {
       this.loading = false;
       this.error = null;
       this.group = payload;
       this.emitChange();
   }

   handleAddError(payload) {
       this.loading = false;
       this.error = payload;
       this.emitChange();
   }
}

/**
* Export
*/
export default GroupGrandeAddStore;
