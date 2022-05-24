const db = require('../routes/db');
const assignmentInSectionModel = require('./AssignmentsInSection');
const formatter = require("../ResponseFormatter");


exports.getSectionFromAssignment = function(assignmentId, callback) {
    db.query(`SELECT section_id,assignment_id FROM assignments_in_section`, (err, response) => {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
        } else {
            if (response.length > 0) {
                callback(formatter.getValidResponse({sections: response}));
            }
            else {
                callback(formatter.getInvalidResponse(404, "No sections found for assignment"));
            }
        }
    });
}

/**
 * Get Assignment by ID
 */
exports.getAssignment = function(assignmentId, callback) {
    db.findByPrimaryKey('assignment', assignmentId, function (err, response) {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
        }
        else {
            if (response.length == 0) {
                callback(formatter.getInvalidResponse(404, "Assignment not found"));
            }
            else {
                callback(formatter.getValidResponse({assignment: response}));
            }
        }
    })
}

/**
 * Add Assignment
 */
exports.addAssignment = function(data, callback) {
    db.insert('assignment', data.assignment, function(err, response) {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
        } else  {
            assignmentInSectionModel.addAssignmentToSection(data.section.section_id,
response.insertId, function(){});
            callback(formatter.getEmptyValidResponse("Assignment successfully created!"));
        }
    });
}

/**
 * Update Assignment
 */
exports.updateAssignment = function(id, data, callback) {
    db.update('assignment', data, {id:{operator:'=', value: id}}, function(err, response) {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
        } else  {
            callback(formatter.getEmptyValidResponse("Assignment successfully updated!"));
        }
    });
}

/**
 * Delete section by ID
 */
exports.deleteAssignment = function(id, callback) {
    db.delete('assignment',{ id:{operator:'=', value: id}}, function (err, response) {
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


exports.getSectionByAssignment = function(assignmentId, callback) {
    db.query("SELECT section_id,assignment_id FROM assignments_in_section", function(err, response) {
        if(err) {
            callback(formatter.getDatabaseErrorResponse(err));
        }
        else if(response.length == 0) {
            callback(formatter.getInvalidResponse(404, "There is something wrong here. Not able to get section_id or assignment_id"));
        } else {
            callback(formatter.getValidResponse({sections: response}));
        }
    });
}
