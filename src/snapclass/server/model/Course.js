const db = require('../routes/db');
const sectionModel = require('./Section');
const formatter = require("../ResponseFormatter");

/**
 * Get course information by ID
 */
exports.getCourse = function(id, callback) {
    db.findByPrimaryKey('course', id, function (err, response) {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
        }
        else {
            if (response.length == 0) {
                callback(formatter.getInvalidResponse(404, "Course not found"));
            }
            else {
                callback(formatter.getValidResponse({course: response}));
            }
        }
    });
}

/**
 * Add new course and section
 */
exports.addCourse = function(data, callback) {
    db.insert('course', data.course, function (err, response) {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
        } else  {
            data.section.course_id = response.insertId;
            sectionModel.addSection(data.section, function(){});
            callback(formatter.getEmptyValidResponse("Course successfully created!"));
        }
    });
}

/**
 * Update course information
 */
exports.updateCourse = function(courseId, data, callback) {
    db.update('course', data, {id:{operator:'=', value: courseId}},function (err, response) {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
          }
          else callback(formatter.getEmptyValidResponse("Course successfully updated!"));
    })
}

/**
 * Delete course by ID
 */
exports.deleteCourse = function(courseId, callback) {
    db.delete('course',{ id:{operator:'=', value: courseId}}, function (err, response) {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
        }
        else if (response.affectedRows == 0) {
            callback(formatter.getInvalidResponse(404, "Course not found, nothing was deleted."))
        }
        else {
            callback(formatter.getEmptyValidResponse("Course successfully deleted"));
        }
    });
}

/**
 * Get all sections for course
 */
exports.getCourseSections = function(id, callback) {
    db.query(`SELECT * FROM section WHERE course_id = ${id}`, function(err, response) {
        if (err) {
          callback(formatter.getDatabaseErrorResponse(err));
        } else {
            callback(formatter.getValidResponse({sections: response}));
        }
    });
}

/**
 * Get courses for teacher
 */
exports.getTeacherCourses = function(id, callback) {
    db.query(`SELECT * FROM course WHERE user_id = ${id}`, function(err, response) {
        if (err) {
          callback(formatter.getDatabaseErrorResponse(err));
        } else {
          if (response.length == 0) {
            callback(formatter.getInvalidResponse(404, "Courses not found"));
          }
          else callback(formatter.getValidResponse({courses: response}));
        }
    });
}
