/**
 * Imports
 */
import BaseStore from 'fluxible/addons/BaseStore';
import copiesActions from '../../constants/copies';

/**
 * Store
 */
class CopiesAddStore extends BaseStore {

    static storeName = 'CopiesAddStore';

    static handlers = {
        [copiesActions.COPIES_ADD]: 'handleAddRequest',
        [copiesActions.COPIES_ADD_SUCCESS]: 'handleAddSuccess',
        [copiesActions.COPIES_ADD_ERROR]: 'handleAddError'
    };

    constructor(dispatcher) {
        super(dispatcher);
        this.loading = false;
        this.error = undefined;
        this.copies = undefined;
    }

    getState() {
        return {
            loading: this.loading,
            error: this.error,
            copies: this.copies
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
        this.copies = state.copies;
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

    getCopies() {
        return this.copies;
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
        this.copies = payload;
        this.emitChange();
    }

    handleAddError(payload) {
        this.loading = false;
        this.error = payload || 'unknown';
        this.emitChange();
    }
}

/**
 * Export
 */
export default CopiesAddStore;
