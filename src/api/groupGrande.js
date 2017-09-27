/**
  * Imports
  */
 import superagent from 'superagent';

 /**
  * Atlas Groups API wrapper
  */
 class GroupGrandeAPI {

     /**
      * Constructor
      * @param options  Object containing ATLAS settings
      * @param getAuthToken  Method that returns the Authorization token
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
             let request = superagent.post(`${this.baseUrl}/groupGrande`).send(payload);
             this._wrapAndRequest(request, resolve, reject);
         });
     }

     /**
      * Groups group
      */
     find(params) {
         return new Promise((resolve, reject) => {
             let request = superagent.get(`${this.baseUrl}/groupGrande`).query(params || {});
             this._wrapAndRequest(request, resolve, reject);
         });
     }

     /**
      * Fetch Group with given ID
      */
     get(groupGrandeId) {
         return new Promise((resolve, reject) => {
             let request = superagent.get(`${this.baseUrl}/groupGrande/${groupGrandeId}`);
             this._wrapAndRequest(request, resolve, reject);
         });
     }

     /**
      * Fetch all the Groups
      */
     getAll() {
         return new Promise((resolve, reject) => {
             let request = superagent.get(`${this.baseUrl}/groupGrande`);
             this._wrapAndRequest(request, resolve, reject);
         });
     }

     /**
      * Update Group
      */
     update(groupGrandeId, payload) {
         return new Promise((resolve, reject) => {
             let request = superagent.put(`${this.baseUrl}/groupGrande/${groupGrandeId}`).send(payload);
             this._wrapAndRequest(request, resolve, reject);
         });
     }

     /**
      * Delete Group
      */
      delete(groupGrandeId) {
          return new Promise((resolve, reject) => {
              let request = superagent.delete(`${this.baseUrl}/groupGrande/${groupGrandeId}`);
              this._wrapAndRequest(request, resolve, reject);
          });
      }
 }

 /**
  * Exports
  */
 export default GroupGrandeAPI;
