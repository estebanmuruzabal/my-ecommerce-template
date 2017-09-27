/**
* Imports
*/
import BaseStore from 'fluxible/addons/BaseStore';
import groupActions from '../../constants/groupMediano';

/**
* Store
*/
class GroupMedianoDetailsStore extends BaseStore {

  static storeName = 'GroupMedianoDetailsStore';

  static handlers = {
      [groupActions.GROUPS_MEDIANO_ITEM]: 'handleRequest',
      [groupActions.GROUPS_MEDIANO_ITEM_SUCCESS]: 'handleSuccess',
      [groupActions.GROUPS_MEDIANO_ITEM_ERROR]: 'handleError',
      [groupActions.GROUPS_MEDIANO_ITEM_SAVE]: 'handleRequest',
      [groupActions.GROUPS_MEDIANO_ITEM_SAVE_SUCCESS]: 'handleSuccess',
      [groupActions.GROUPS_MEDIANO_ITEM_SAVE_ERROR]: 'handleError'
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

  handleRequest() {
      this.loading = true;
      this.emitChange();
  }

  handleSuccess(payload) {
      this.loading = false;
      this.error = null;
      this.group = payload;
      this.emitChange();
  }

  handleError(payload) {
      this.loading = false;
      this.error = payload;
      this.emitChange();
  }
}

/**
* Export
*/
export default GroupMedianoDetailsStore;
