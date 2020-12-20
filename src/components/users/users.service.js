import OctDiscoService from "../common/oct.disco.service";

/**
 * @author Isaac S. Mwakabira
 * 
 * User service controller
 */
class UserService {
    /**
     * Fetch all users/resource(s) from the api
     * 
     * @returns {Promise} promise
     */
    getUsers = () => OctDiscoService.get(`/users`);

    /**
     * Fetch all comments/resource(s) given user id from the api
     * 
     * @returns {Promise} promise
     */
    getUserComments = userid => OctDiscoService.get(`/users/${ userid }/comments`);

    /**
     * Search users by name from the api
     * 
     * @param {String} searchTerm
     * @returns {Promise} list of matched resources - users
     */
    searchUsers = searchTerm => OctDiscoService.get(`/users`);
}

export default UserService = new UserService();