module.exports = {
    /**
     * Returns a valid response object to be interpreted and sent to client
     * Defaults to status code 200, true success value, and no message
     * @param {*} data The data to send in the response
     */
    getValidResponse: function(data) {
        return getResponse(200, true, null, data);
    },

    /**
     * Returns a valid response object to be interpreted and sent to client
     * Defaults to status code 200, true success value, and no data
     * @param {*} message The message to be sent to the client
     */
    getEmptyValidResponse: function(message) {
        return getResponse(200, true, message, null);
    },

    /**
     * Returns an invalid response object to be interpreted and sent to client
     * Defaults to success value of false and no extra data
     * @param {*} code The error code to send in the response
     * @param {*} message The error message to be sent to the client
     */
    getInvalidResponse: function(code, message) {
        return getResponse(code, false, message, null);
    },

    /**
     * Returns an invalid response object to be interpreted and sent to client
     * Defaults to status code of 400, success value of false, and no extra data
     * @param {*} message The error message to be sent to the client
     */
    getDefaultInvalidResponse: function(message) {
        return getResponse(400, false, message, null);
    },
    /**
     * Returns an invalid response object to be interpreted and sent to client
     * based on an error object.
     * @param {*} err The error object returned from database
     */
    getDatabaseErrorResponse(err) {
        return getResponse(400, false, err.message, null);
    }

}

/**
 * Returns a response object to be interpreted and sent to client.
 * This function controls the format of every API call in GradSnap.
 * @param code The HTTP status code to be sent to the client
 * @param success A boolean used to help the front end determine if the request was successful
 * @param message (Optional) A message to be sent to the client
 * @param data (Optional) The data to be sent back to client
 */
function getResponse(code, success, message, data) {
    if (!data) {
        data = {};
    }
    data.success = success;
    if (message) {
        data.message = message;
    }
    data.code = code;
    return {
        code: code,
        data: data
    };
}
