const db = require('../routes/db');
const roleModel = require('./Role');
const formatter = require('../ResponseFormatter');

/**
 * Get students with partial username
 */
exports.getStudentsByPartialUserName = function(partialUsername, callback) {
    db.query(`SELECT user.id, user.name, user.preferred_name, user.email, username FROM user INNER JOIN role_for_user ON user.id = role_for_user.user_id WHERE username LIKE '${partialUsername}%' AND role_id = ${roleModel.enum.STUDENT}`, function(err, response) {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
        } 
        else {
            if (response.length == 0) {
                callback(formatter.getInvalidResponse(404, "No students found with username"));
            }
            else {
                callback(formatter.getValidResponse({students: response}));
            }
        }
    })
}

/**
 * Get courses for student
 */
exports.getCourses = function(id, callback) {
    db.query(`SELECT c.id, c.name, c.description, b.section_number, a.section_id, d.preferred_name FROM students_in_section as a INNER JOIN section as b  ON a.section_id = b.id INNER JOIN course as c ON b.course_id = c.id INNER JOIN user as d ON c.user_id = d.id WHERE a.user_id = ${id}`, function(err, response) {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
        } 
        else {
            if (response.length == 0) {
                callback(formatter.getInvalidResponse(404, "No courses found for student"));
            }
            else {
                callback(formatter.getValidResponse({courses: response}));
            }
        }
    })
}

/**
 * Get course for student
 */
exports.getCourse = function(id, callback) {
    db.query(`SELECT DISTINCT c.id, c.name, c.description, b.section_number, a.section_id, d.preferred_name as teacher_name, d.username as teacher_email FROM students_in_section as a INNER JOIN section as b  ON a.section_id = b.id INNER JOIN course as c ON b.course_id = c.id INNER JOIN user as d ON c.user_id = d.id WHERE b.id = ${id}`, function(err, response) {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
        } 
        else {
            if (response.length == 0) {
                callback(formatter.getDefaultInvalidResponse("Course not found for student"));
            }
            else {
                callback(formatter.getValidResponse({course: response}));
            }
        }
    })
}