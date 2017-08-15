/**
 * Imports
 */
import superagent from 'superagent';

/**
 * Atlas Groups API wrapper
 */
class GroupsAPI {

    /**
     * Constructor
     * @param options - Object containing ATLAS settings
     * @param getAuthToken - Method that returns the Authorization token
     */
    constructor({options, getAuthToken}) {
        this.baseUrl = options.baseUrl;
        this.getAuthToken = getAuthToken;
    }

    /**
     * All API calls should be wrapped/handled/called by this in method order
     * for any common additional stuff to be done (e.g. adding Authorization headers)
     */
    _wrapAndRequest(request, resolve, reject) {
        if (this.getAuthToken()) {
            request.set('Authorization', this.getAuthToken());
        }
        request.end(function (err, result) {
            if (err) {
                reject({status: err.status, result: (result) ? result.body : null});
            } else {
                resolve(result.body);
            }
        });
    }

    /**
     * Create new Group
     */
    create(payload) {
        return new Promise((resolve, reject) => {
            let request = superagent.post(`${this.baseUrl}/groups`).send(payload);
            this._wrapAndRequest(request, resolve, reject);
        });
    }

    /**
     * Groups group
     */
    find(params) {
        return new Promise((resolve, reject) => {
            let request = superagent.get(`${this.baseUrl}/groups`).query(params || {});
            this._wrapAndRequest(request, resolve, reject);
        });
    }

    /**
     * Fetch Group with given ID
     */
    get(groupId) {
        return new Promise((resolve, reject) => {
            let request = superagent.get(`${this.baseUrl}/groups/${groupId}`);
            this._wrapAndRequest(request, resolve, reject);
        });
    }

    /**
     * Fetch all the Groups
     */
    getAll() {
        return new Promise((resolve, reject) => {
            let request = superagent.get(`${this.baseUrl}/groups`).query(params || {});
            this._wrapAndRequest(request, resolve, reject);
        });
    }

    /**
     * Update Group
     */
    update(groupId, payload) {
        return new Promise((resolve, reject) => {
            let request = superagent.put(`${this.baseUrl}/groups/${groupId}`).send(payload);
            this._wrapAndRequest(request, resolve, reject);
        });
    }

    /**
     * Delete Group
     */
     delete(groupId) {
         return new Promise((resolve, reject) => {
             let request = superagent.delete(`${this.baseUrl}/groups/${groupId}`);
             this._wrapAndRequest(request, resolve, reject);
         });
     }
}

/**
 * Exports
 */
export default GroupsAPI;
