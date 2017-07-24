/**
 * Imports
 */
import superagent from 'superagent';

/**
 * Atlas Products API wrapper
 */
class CopiesAPI {

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
     * Create Copies
     */
    create(payload) {
        return new Promise((resolve, reject) => {
            let request = superagent.post(`${this.baseUrl}/copies`).send(payload);
            this._wrapAndRequest(request, resolve, reject);
        });
    }

    /**
     * Product collection
     */
    find(params) {
        return new Promise((resolve, reject) => {
            let request = superagent.get(`${this.baseUrl}/copies`).query(params || {});
            this._wrapAndRequest(request, resolve, reject);
        });
    }

    /**
     * Delete Product
     */
     delete(copiesId) {
         return new Promise((resolve, reject) => {
             let request = superagent.delete(`${this.baseUrl}/copies/${copiesId}`);
             this._wrapAndRequest(request, resolve, reject);
         });
     }
    /**
     * Fetch Product with given ID
     */
    get(copiesId) {
        return new Promise((resolve, reject) => {
            let request = superagent.get(`${this.baseUrl}/copies/${copiesId}`);
            this._wrapAndRequest(request, resolve, reject);
        });
    }

    /**
     * Update Product
     */
    update(copiesId, payload) {
        return new Promise((resolve, reject) => {
            let request = superagent.put(`${this.baseUrl}/copies/${copiesId}`).send(payload);
            this._wrapAndRequest(request, resolve, reject);
        });
    }

    /**
     * Upload product information
     */
    upload(resource, file) {
        return new Promise((resolve, reject) => {

            let formData = new FormData();
            formData.append('file', file);
            formData.append('resource', resource);

            let request = superagent.post(`${this.baseUrl}/copies/upload`).send(formData);
            this._wrapAndRequest(request, resolve, reject);
        });
    }
}

/**
 * Exports
 */
export default CopiesAPI;
