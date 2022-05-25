const jwt = require('jsonwebtoken');
const config = require('../routes/config');
const roleModel = require('../model/Role');

const sectionModel = require('../model/Section');
const courseModel = require('../model/Course');
const rubricModel = require('../model/Rubric');
const assignmentModel = require('../model/Assignment');

const formatter = require('../ResponseFormatter');

/**
 * Required permission for API method
 */
exports.requiredRole = function(roles) {
    return function (req, res, next) {
        if (req.headers['authorization']) {
            var decoded = jwt.verify(req.headers['authorization'].replace("Bearer JWT ", ""), config.secret);
            flag = true;
            roles.forEach(role => {
                if (decoded && (decoded['permissions'] == role || decoded['permissions'] == roleModel.enum.ADMIN)) {
                    next();
                    flag = false;
                }
            });
            if (flag) res.sendStatus(403);
        } else {
            res.sendStatus(403);
        }
    }
}

/**
 * Middleware that determines if a user id matches the user id the
 * request is trying to make changes to
 */
exports.verifyUserIDMatches = function() {
    return function (req, res, next) {
        var reqID = getIDFromReq(req);
        var id = req.params.id;
        
        if (reqID != null && reqID != undefined && reqID == id) {
            next();            
        }
        else {
            res.sendStatus(403);
        }
    }
}

/**
 * Returns the decoded authorization header
 * @param {*} auth The authorization header to decode
 */
function decodeToken(auth) {
    var decoded = null;
    if (auth) {
        decoded = jwt.verify(auth.replace("Bearer JWT ", ""), config.secret);
    }
    return decoded;
}
/**
 * Returns the user id from an encoded request header
 * @param {*} req The request to get the id from
 */
function getIDFromReq(req) {
    var auth = req.headers['authorization'];
    var decoded = decodeToken(auth);
    // Prevent undefined errors
    if (!decoded || !decoded.data || !decoded.data.length || decoded.data.length < 1) {
        return null;
    }
    return decoded.data[0].id;
}


exports.getIDFromReq = getIDFromReq;

/**
 * Middleware to verify the user owns the section they
 * are attempting to modify
 */
exports.verifyUserOwnsSection = function() {
    return function(req, res, next) {
        var id = req.params.sectionId;
        sectionModel.getSection(id, function(value) {
            var section = value.data.section;
            if (section && section.course_id) {
                courseModel.getCourse(section.course_id, function(value) {
                    var course = value.data.course;
                    if (course) {
                        if (course.user_id != null && course.user_id == getIDFromReq(req)) {
                            // User id matches the user id of the course that this section is in,
                            // so request can continue
                            next();
                        }
                        else {
                            // user id didn't match the user id of the course this section was associated with
                            var value = formatter.getInvalidResponse(403, "You don't have permission to modify this section.");
                            res.status(value.code).json(value.data);
                        }
                    }
                    else {
                        // section's course didn't exist
                        var value = formatter.getInvalidResponse(403, "You don't have permission to modify this section.");
                        res.status(value.code).json(value.data);
                    }
                });
            }
            else {
                // Section wasn't found, so user shouldn't have made this request
                var value = formatter.getInvalidResponse(404, "Section not found");
                res.status(value.code).json(value.data);
            }
        });
    }
}

/**
 * Middleware to verify user should be able to access rubric
 */
exports.verifyUserOwnsRubric = function() {
    return function(req, res, next) {
        var userID = getIDFromReq(req);
        rubricModel.getRubric(req.params.rubricId, function(val) {
            var rubric = val.data.rubric;
            if (rubric && rubric.user_id == userID) {
                // Anyone should be able to access template rubric,
                // or if the user id matches the rubric's user id then they should
                // also be able to access it.
                next();
            }
            else {
                var value = formatter.getInvalidResponse(403, "You're not authorized to access this rubric.");
                res.status(value.code).json(value.data);
            }
        });

    }
}

/**
 * Middleware to verify user should be able to access Course
 */
exports.verifyUserOwnsCourse = function() {
    return function(req, res, next) {
        var userID = getIDFromReq(req);
        courseModel.getCourse(req.params.courseId, function(val) {
            var course = val.data.course;
            if (course){
                if(course.user_id == userID) {
                    // If the user id matches the course's user id then continue
                    next();
                }
                else {
                    var value = formatter.getInvalidResponse(403, "You're not authorized to access this course.");
                    res.status(value.code).json(value.data);
                }
            }
            else {
                var value = formatter.getInvalidResponse(404, "Course not found.");
                res.status(value.code).json(value.data);
            }
        });

    }
}

/**
 * Middleware to verify user should be able to access Assignment
 */
// Warning, this is commented out because simply determining the user id of the
// rubric the assignment is doesn't work, instead you should check the user id of the section
// the assignment belongs to belongs to the user making the request.
/**
exports.verifyUserOwnsAssignment = function() {
    return function(req, res, next) {
        var userID = getIDFromReq(req);
        assignmentModel.getAssignment(req.params.assignmentId, function(val) {
            var assignment = val.data.assignment;
            if (assignment) {
                rubricModel.getRubric(assignment.rubric_id, function(val) {
                    var rubric = val.data.rubric;
                    if (rubric && rubric.user_id == userID) {
                        next();
                    }
                    else {
                        var value = formatter.getInvalidResponse(403, "You're not authorized to access this assignment.");
                        res.status(value.code).json(value.data);
                    }
                });
            }
            else {
                var value = formatter.getInvalidResponse(404, "Assignment not found.");
                res.status(value.code).json(value.data);
            }
        });

    }
}
*/
