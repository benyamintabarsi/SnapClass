const db = require('../routes/db');
const roleModel = require('./Role');
const config = require('../routes/config');
const jwt = require('jsonwebtoken');
const formatter = require('../ResponseFormatter.js');

/**
 * Get user information
 */
exports.postLog = function(logForm, callback) {
    db.insert('logs', logForm, function(err, response) {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
        }
        else {
            if (response.length == 0) {
                callback(formatter.getInvalidResponse(404, 'Time could not be added'));
            }
            else callback(formatter.getValidResponse({user: response}));
        }
    })
}
