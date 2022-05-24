const db = require('../routes/db');
const formatter = require("../ResponseFormatter");

/**
 * Get grade by user ID and assignment ID
 */
exports.getGrade = function(assignmentID, studentID, callback) {
    db.query(`SELECT id, grade_total, assignment_feedback, group_concat(point_for_category) points FROM assignment_overall_grade_total WHERE user_id = ${studentID} AND assignment_id = ${assignmentID} GROUP BY assignment_id AND user_id`, function(err, response) {
        if (err) {
            callback({success: false, code: err.code, message: err.message});
        }
        else {
            if (response.length == 0) {
                callback({success: false, message: "No grade found for student"});
            }
            else {
                callback({success: true, grade: response});
            }
        }
    })
}

/**
 * Update grade
 */
exports.updateGrade = function(assignmentID, studentID, data, callback) {
    db.query(`DELETE FROM assignment_overall_grade_total WHERE user_id = ${studentID} AND assignment_id = ${assignmentID}`, function(err, response) {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
        }
        else {
            exports.addGrade(data, function(value) {
                callback(value);
            })
        }
    })
}

/**
 * Add new grade
 */
exports.addGrade = function(data, callback) {
    if (data.point_for_category) {
        pfc = data.point_for_category.split(',');
        lastIdx = parseInt(pfc[pfc.length-1]);
        pfc.forEach(point => {
            addPoint(data, parseInt(point), function(err, value) {
                if (err) {
                    callback(err);
                } else if (lastIdx == parseInt(point)) {
                    callback(value);
                }
            });
        });
    }
}

addPoint = function(data, pointID, callback) {
    data.point_for_category = pointID;
    db.insert('assignment_overall_grade_total', data, function(err, response) {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
        }
        else {
            callback(null, formatter.getEmptyValidResponse("Grade successfully added!"));
        }
    });
}

/**
 * Get all grades for assignment
 */
exports.getAssignmentGrades = function(sectionID, assignmentID, callback) {
    db.query(`SELECT ss.user_id, u.name, sub.is_submitted, a.grade_total, a.assignment_feedback, IF(c.id IS NULL, NULL, group_concat(c.id)) categories, IF(p.points IS NULL, NULL, group_concat(p.points)) points FROM assignments_in_section as ass INNER JOIN students_in_section as ss ON ss.section_id = ass.section_id LEFT JOIN assignment_overall_grade_total as a ON a.assignment_id = ass.assignment_id AND ss.user_id = a.user_id LEFT JOIN user as u ON u.id = ss.user_id LEFT JOIN points_for_category as p ON p.id = a.point_for_category LEFT JOIN category as c ON c.id = p.category_id LEFT JOIN submission as sub ON sub.user_id = ss.user_id AND sub.assignment_id = ass.assignment_id WHERE ass.assignment_id = ${assignmentID} AND ass.section_id = ${sectionID} GROUP BY ss.user_id `, function(err, response) {
        if (err) {
            callback({success: false, code: err.code, message: err.message});
        }
        else if (response.length == 0) {
            callback({success: false, message: "No grades found for assignment"});
        }
        else {
            var gradebook = response;
            gradebook.forEach(function(student) {
                if (student.categories && student.points) {
                    var c = student.categories.split(',');
                    var p = student.points.split(',');
                    if (c.length == p.length) {
                        student.point_for_categories = [];
                        for (i = 0; i < c.length; i++) {
                            student.point_for_categories.push({category: parseInt(c[i]), point: parseFloat(p[i])});
                        }
                    }
                    else {
                        student.point_for_categories = null;
                    }
                }
                else {
                    student.point_for_categories = null;
                }
                delete student.categories;
                delete student.points;
            });
            callback({success: true, gradebook: gradebook});
        }
    });
}

exports.getSectionGrades = function(sectionID, callback) {
    db.query(`SELECT DISTINCT sis.user_id, u.name, GROUP_CONCAT(CONCAT(a.id, '=', IFNULL(aogt.grade_total, 'NULL'))) grades FROM assignments_in_section ais LEFT JOIN students_in_section sis ON sis.section_id = ais.section_id LEFT JOIN assignment a ON a.id = ais.assignment_id LEFT JOIN assignment_overall_grade_total aogt ON a.id = aogt.assignment_id AND aogt.user_id = sis.user_id LEFT JOIN user u ON sis.user_id = u.id WHERE ais.section_id = ${sectionID} GROUP BY sis.user_id`, function(err, response) {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
        }
        else {
            if (response.length == 0) {
                callback(formatter.getValidResponse({gradebook: []}));
            }
            else {
                var g = response;
                g.forEach(function(student) {
                    if (student.grades) {
                        var grades = student.grades.split(',');
                        student.grades = [];
                        grades.forEach(function(grade) {
                            var assignment = grade.split('=');
                            if (assignment[1] != "NULL") student.grades.push({assignment: parseInt(assignment[0]), grade: parseFloat(assignment[1])});
                            else student.grades.push({assignment: parseInt(assignment[0]), grade: null});
                        });
                    }
                });
                callback(formatter.getValidResponse({gradebook: response}));
            }
        }
    });
}
