const db = require('../routes/db');
const formatter = require('../ResponseFormatter.js');

/**
 * GET active section
 */
exports.getActiveSection = function(userId, callback) {
    db.query(`SELECT * FROM active_section WHERE user_id = ${userId}`, (err, response) => {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
        } else {
            if (response.length > 0) {
                callback(formatter.getValidResponse({sectionId: response[0].section_id}));
            }
            else {
                callback(formatter.getDefaultInvalidResponse("Error getting active section"));
            }
        }
    });
}

/**
 * POST active section
 */
exports.addActiveSection = function(sectionId, userId, callback) {
    db.insert('active_section', {section_id: sectionId, user_id: userId}, (err, response) => {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
        }
        else {
            callback(formatter.getEmptyValidResponse("Active section successfully added!"));
        }
    });
}

/**
 * PUT active section
 */
exports.updateActiveSection = function(sectionId, userId, callback) {
    db.update('active_section', {section_id: sectionId}, {user_id: {operator:'=', value: userId}}, (err, response) => {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
        }
        else {
            callback(formatter.getEmptyValidResponse("Active section successfully updated!"));
        }
    });
}