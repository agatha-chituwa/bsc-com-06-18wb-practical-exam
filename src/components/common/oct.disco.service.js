import Config from "./config.common";
import Promise from "./promise.common";

/**
 * @author Isaac S. Mwakabira
 * 
 * Fantastic Octo Disco Api service
 */
class OctService {

    /**
     * Get resource(s) from the api
     * 
     * @param {String} url
     * @returns {Promise} promise
     */
    get = async (url) => {
        return await Promise(Config.JSON_PLACEHOLDER_API.get(url))
            .get().then(response => this.handleReponse(response));
    }

    /**
     * Post resource(s) to the api
     * 
     * @param {String} url
     * @param {Object} payload
     * @returns {Promise} promise
     */
    post = async (url, payload) => {
        // define headers
        const config = new Headers();
        config.append("Access-Control-Allow-Origin", Config.ACCESS_ALLOW_ORIGIN)

        return await Promise(Config.JSON_PLACEHOLDER_API.post(url, payload, config))
            .get()
            .then(response => this.handleReponse(response));
    }

    /**
     * Edit a resource(s) via the api and return a promise
     * 
     * @param {String} url
     * @param {Object} payload
     * @returns {Promise} promise
     */
    put = async (url, payload) => {
        // define headers
        const config = new Headers();
        config.append("Access-Control-Allow-Origin", Config.ACCESS_ALLOW_ORIGIN);
        config.append("withCredentials", true);

        return await Promise(Config.JSON_PLACEHOLDER_API.put(url, payload, config))
            .get()
            .then(response => this.handleReponse(response));
    }

    /**
     * Edit a resource(s) via the api and return a promise
     * 
     * @param {String} url
     * @param {Object} payload
     * @returns {Promise} promise
     */
    patch = async (url, payload) => {
        // define headers
        const config = new Headers();
        config.append("Access-Control-Allow-Origin", Config.ACCESS_ALLOW_ORIGIN);
        config.append("withCredentials", true);

        return await Promise(Config.JSON_PLACEHOLDER_API.patch(url, payload, config))
            .get()
            .then(response => this.handleReponse(response));
    }

    /**
     * Deletes a resource and return a promise
     * 
     * @param {String} url
     * @returns {Promise} promise
     */
    patch = async (url) => {
        return await Promise(Config.JSON_PLACEHOLDER_API.delete(url))
            .get()
            .then(response => this.handleReponse(response));
    }

    /**
     * Make api requests using the browser Fetch API
     * Similar to Axios used above
     */
    call = (url, configs) => {
        return Promise(fetch(`${url}`, configs)).get() 
            .then(response => this.handleFetchResponse(response));
    }

    /**
     * handle api response
     * 
     * @param response
     * @return json
     */
    handleFetchResponse = response => {
        // if(response.status !== 200) {
        //     throw Error(response.statusText)
        // }

        return response.json();
    }

    /**
     * handle api response
     * 
     * @param response
     * @return data
     */
    handleReponse = response => {
        if(response.status !== 200) {
            throw Error(response.statusText)
        }

        return response.data;
    }
}

export default OctService = new OctService();