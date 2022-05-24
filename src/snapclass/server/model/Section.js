const db = require('../routes/db');
const formatter = require('../ResponseFormatter');

/**
 * Get all from teacher ID
 */

 exports.getAllForTeacher = function(id, callback) {
     db.query(`SELECT course.id AS courseId, course.name, course.status, course.description, course.start_date, course.end_date, section.id AS sectionId, section.section_number
                FROM course
                JOIN section
                ON course.id = section.course_id
                WHERE course.user_id = ${id}`, function(err, response) {
         if (err) {
           callback(formatter.getDatabaseErrorResponse(err));
         } else {
           if (response.length == 0) {
             callback(formatter.getInvalidResponse(404, "Courses not found"));
           }
           else callback(formatter.getValidResponse({coursesections: response}));
         }
     });
     }

/**
 * Get section by ID
 */
exports.getSection = function(id, callback) {
    db.findByPrimaryKey('section', id, function (err, response) {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
        }
        else {
            if (response.length == 0) {
                callback(formatter.getInvalidResponse(404, "Section not found"));
            }
            else {
                callback(formatter.getValidResponse({section: response}));
            }
        }
    })
}

/**
 * Add section
 */
exports.addSection = function(data, callback) {
    db.insert('section', data, function(err, response) {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
        } else  {
            callback(formatter.getEmptyValidResponse("Section successfully created!"));
        }
    });
}

/**
 * Update section
 */
exports.updateSection = function(sectionId, data, callback) {
    db.update('section', data, {id:{operator:'=', value: sectionId}}, function(err, response) {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
        } else  {
            callback(formatter.getEmptyValidResponse("Section successfully updated!"));
        }
    });
}

/**
 * Delete section by ID
 */
exports.deleteSection = function(id, callback) {
    db.delete('section',{ id:{operator:'=', value: id}}, function (err, response) {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
          }
          else callback(formatter.getEmptyValidResponse("Section successfully deleted"));
    });
}

/**
 * Get all students in section
 */
exports.getStudentsInSection = function(sectionId, callback) {
    db.query("SELECT user.id, user.username, user.name, user.preferred_name, user.email FROM students_in_section INNER JOIN user ON students_in_section.user_id = user.id WHERE students_in_section.section_id ='" + sectionId + "'", (err, response) => {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
        } else {
            if (response.length > 0) {
                callback(formatter.getValidResponse({students: response}));
            }
            else {
                //no students found
                callback(formatter.getValidResponse({students: []}));
            }
        }
    });
}

/**
 * Add student to section
 */
exports.addStudentToSection = function(sectionId, user, callback) {
    db.insert('students_in_section', {section_id: sectionId, user_id: user}, (err, response) => {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
        }
        else {
            callback(formatter.getEmptyValidResponse("Student successfully added to section!"));
        }
    });
}

/**
 * Add student to section
 */
exports.deleteStudentFromSection = function(sectionId, userId, callback) {
    db.query(`DELETE FROM students_in_section WHERE user_id = ${userId} AND section_id = ${sectionId}`, (err, response) => {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
        }
        else {
            callback(formatter.getEmptyValidResponse("Student successfully removed from section"));
        }
    });
}
