/**
 * Imports
 */
import BaseStore from 'fluxible/addons/BaseStore';
import groupActions from '../../constants/groups';

/**
 * Store
 */
class GroupsStore extends BaseStore {

    static storeName = 'GroupsStore';

    static handlers = {
        [groupActions.GROUPS]: 'handleRequest',
        [groupActions.GROUPS_SUCCESS]: 'handleSuccess',
        [groupActions.GROUPS_ERROR]: 'handleError',

        [groupActions.GROUPS_ITEM_SAVE_SUCCESS]: 'handleItemSaveSuccess',

        [groupActions.GROUPS_BULK_SAVE]: 'handleBulkSaveRequest',
        [groupActions.GROUPS_BULK_SAVE_SUCCESS]: 'handleBulkSaveSuccess',
        [groupActions.GROUPS_BULK_SAVE_ERROR]: 'handleBulkSaveError'
    };

    constructor(dispatcher) {
        super(dispatcher);
        this.loading = false;
        this.error = undefined;
        this.groups = undefined;
        this.groupTree = undefined;
    }

    getState() {
        return {
            loading: this.loading,
            error: this.error,
            groups: this.groups,
            groupTree: this.groupTree
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
        this.groupTree = state.groupTree;
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

    /**
     * Returns the groups that contain all of the given tags
     * @param {array} tags
     * @param {boolean} enabled - Return only the ones that are enabled
     */
    getGroups(tags, enabled) {
        tags = tags || [];
        if (this.groups && this.groups.items) {
            return this.groups.items.filter(function (item) {
                let containsAllTags = tags.every(function(val) { return item.tags.indexOf(val) >= 0; });
                return (enabled === true) ? item.enabled && containsAllTags : containsAllTags;
            });
        } else {
            return [];
        }
    }

    /**
     * Returns the groups ordered
     * @param {array} tags - specific tags the groups must have
     * @param {boolean} enabled - Return only the ones that are enabled
     * @param {string} orderingKey - (optional) the key from metadata that should be used to order (default: 'order')
     */
    getOrderedGroups(tags, enabled, orderingKey) {
        let groups = this.getGroups(tags, enabled);
        let _orderingKey = orderingKey || 'order';
        groups.sort(function (a, b) {
            if (a.metadata[_orderingKey] < b.metadata[_orderingKey])
                return -1;
            else if (a.metadata[_orderingKey] > b.metadata[_orderingKey] || !a.metadata[_orderingKey])
                return 1;
            else
                return 0;
        });
        return groups;
    }

    /**
     * Returns the groups organized top-down according to parent information
     */
    getGroupsTree() {
        return this.groupTree;
    }

    /**
     * Returns the ordered list of Main Navigation groups
     */
    getMainNavigationGroups() {
        let groups = this.getGroups(['mainNavigation']);
        groups.sort(function (a, b) {
            if (a.metadata.mainNavigationOrder < b.metadata.mainNavigationOrder)
                return -1;
            else if (a.metadata.mainNavigationOrder > b.metadata.mainNavigationOrder || !a.metadata.mainNavigationOrder)
                return 1;
            else
                return 0;
        });
        return groups;
    }

    /**
     * Returns the Group with the given ID
     */
    getGroup(id) {
        if (this.groups && this.groups.items) {
            return this.groups.items.filter(function (item) {
                return item.id === id;
            })[0];
        } else {
            return null;
        }
    }

    //
    // Handlers
    //

    // Request List

    handleRequest() {
        this.loading = true;
        this.emitChange();
    }

    handleSuccess(payload) {
        this.loading = false;
        this.error = null;
        this.groups = payload;
        this._buildGroupTree();
        this.emitChange();
    }

    handleError(payload) {
        this.loading = false;
        this.error = payload;
        this.emitChange();
    }

    // Item Update

    handleItemSaveSuccess(payload) {
        let updatedGroup = payload;
        if (this.groups && this.groups.items) {
            for (let i=0, len=this.groups.items.length; i<len; i++) {
                if (this.groups.items[i].id === updatedGroup.id) {
                    this.groups.items[i] = updatedGroup;
                }
            }
        }
        this._buildGroupTree();
        this.emitChange();
    }

    // Bulk Update

    handleBulkSaveRequest() {
        this.loading = true;
        this.emitChange();
    }

    handleBulkSaveSuccess(payload) {
        this.loading = false;
        this.error = null;
        if (this.groups && this.groups.items) {
            payload.forEach((updatedGroup) => {
                for (let i=0, len=this.groups.items.length; i<len; i++) {
                    if (this.groups.items[i].id === updatedGroup.id) {
                        this.groups.items[i] = updatedGroup;
                    }
                }
            });
        }
        this._buildGroupTree();
        this.emitChange();
    }

    handleBulkSaveError(payload) {
        this.loading = false;
        this.error = payload;
        this.emitChange();
    }

    //
    // Private methods
    //

    /**
     * Create a top-down group tree from the current state of groups
     * @private
     */
    _buildGroupTree() {
        if (!this.groups || !this.groups.items) {
            this.groupTree =  [];
        } else {
            let groups = JSON.parse(JSON.stringify(this.groups.items));
            let addChildren = (group) => {
                group.children = groups.filter(c => c.parentId === group.id);
                group.children.forEach(c => addChildren(c));
            };
            let groupTree = groups.filter(c => !c.parentId);
            groupTree.forEach(c => addChildren(c));
            this.groupTree = groupTree;
        }
    }
}

/**
 * Export
 */
export default GroupsStore;
