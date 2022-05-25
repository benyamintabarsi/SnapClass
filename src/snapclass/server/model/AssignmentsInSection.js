const db = require('../routes/db');
const formatter = require("../ResponseFormatter");
/**
 * Get all assignments in section
 */
exports.getAssignmentsInSection = function(sectionId, callback) {
    db.query(`SELECT c.id, c.name, c.description, c.status, c.start_date, c.due_date, d.name as course_name FROM assignments_in_section as a INNER JOIN section as b ON a.section_id = b.id INNER JOIN assignment as c ON c.id = a.assignment_id INNER JOIN course as d ON d.id = b.course_id WHERE b.id = ${sectionId} ORDER BY due_date ASC`, (err, response) => {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
        } else {
            if (response.length > 0) {
                callback(formatter.getValidResponse({assignments: response}));
            }
            else {
                callback(formatter.getValidResponse({assignments: []}));
            }
        }
    });
}


/**
 * Get all past assignments in section
 */
exports.getPastAssignmentsInSection = function(sectionId, callback) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var currentDate = yyyy + "-" + mm + "-" + dd;
    db.query(`SELECT c.id, c.name, c.description, c.status, c.start_date, c.due_date, d.name as course_name FROM assignments_in_section as a INNER JOIN section as b ON a.section_id = b.id INNER JOIN assignment as c ON c.id = a.assignment_id INNER JOIN course as d ON d.id = b.course_id WHERE b.id = ${sectionId} AND c.due_date < '${currentDate}' ORDER BY due_date DESC`, (err, response) => {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
        } else {
            if (response.length > 0) {
                callback(formatter.getValidResponse({assignments: response}));
            }
            else {
                callback(formatter.getInvalidResponse(404, "No past assignments found for section"));
            }
        }
    });
}

/**
 * Get all upcoming assignments in section
 */
exports.getUpcomingAssignmentsInSection = function(sectionId, callback) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var currentDate = yyyy + "-" + mm + "-" + dd;
    db.query(`SELECT c.id, c.name, c.description, c.status, c.start_date, c.due_date, d.name as course_name FROM assignments_in_section as a INNER JOIN section as b ON a.section_id = b.id INNER JOIN assignment as c ON c.id = a.assignment_id INNER JOIN course as d ON d.id = b.course_id WHERE b.id = ${sectionId} AND c.due_date >= '${currentDate}' ORDER BY due_date ASC`, (err, response) => {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
        } else {
            if (response.length > 0) {
                callback(formatter.getValidResponse({assignments: response}));
            }
            else {
                callback(formatter.getInvalidResponse(404, "No upcoming assignments found for section"));
            }
        }
    });
}

/**
 * Add assigment to section
 */
exports.addAssignmentToSection = function(sectionId, assignmentId, callback) {
    db.insert('assignments_in_section', {section_id: sectionId, assignment_id: assignmentId}, (err, response) => {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
        }
        else {
            callback(formatter.getEmptyValidResponse("Assignment successfully added!"));
        }
    });
}

/**
 * Delete assignment from section
 */
exports.deleteAssignmentFromSection = function(sectionId, assignmentId, callback) {
    db.query(`DELETE FROM assignments_in_section WHERE assignment_id = ${assignmentId} AND section_id = ${sectionId}`, (err, response) => {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
        }
        else if (response.affectedRows == 0) {
            callback(formatter.getInvalidResponse(404, "Assignment not found, nothing was deleted."));
        }
        else {
            callback(formatter.getEmptyValidResponse("Assignment successfully deleted!"));
        }
    });
}
