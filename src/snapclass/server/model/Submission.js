const db = require('../routes/db');
const formatter = require('../ResponseFormatter.js');

/**
 * Get submission by user ID and assignment ID
 */
exports.getSubmission = function(studentID, assignmentID, callback) {
    db.query(`SELECT * FROM submission WHERE user_id = ${studentID} AND assignment_id = ${assignmentID}`, function(err, response) {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
        } 
        else {
            if (response.length == 0) {
                callback(formatter.getInvalidResponse(404, "No submission found for student"));
            }
            else {
                callback(formatter.getValidResponse({submission: response[0]}));
            }
        }
    })
}

/**
 * Update submission
 */
exports.updateSubmission = function(submissionID, data, callback) {
    db.update('submission', data, {id:{operator:'=', value: submissionID}}, function(err, response) {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
        } else  {
            callback(formatter.getEmptyValidResponse("Submission successfully updated!"));
        }
    });
}

/**
 * Add new submission
 */
exports.addSubmission = function(data, callback) {
    db.insert('submission', data, function(err, response) {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
        } else  {
            callback(formatter.getEmptyValidResponse("Submission successfully added!"));
        }
    });
}