var globalHelper = require("../../../globalHelper.js");
const REQUEST_URL = globalHelper.BASE_URL + "/courses";

module.exports = {
    REQUEST_URL: REQUEST_URL,

    getAddCourseOptions: function(token, name, startDate, endDate, status, userID, section) {
        var opts = {};
        opts.headers = globalHelper.getAuthorizationHeader(token);
        opts.json = {
            course: {
                name: name,
                start_date: startDate,
                end_date: endDate,
                status: status,
                user_id: userID
            },
            section: {
                section_number: section
            }
        }
        return opts;
    },

    getUpdateCourseOptions: function(token, name, startDate, endDate, status, userID) {
        var opts = {};
        opts.headers = globalHelper.getAuthorizationHeader(token);
        opts.json = {
            name: name,
            start_date: startDate,
            end_date: endDate,
            status: status,
            user_id: userID
        }
        return opts;
    },

    getGetAllCoursesForTeacherURL: function(userID) {
        return globalHelper.BASE_URL + "/teachers/" + userID + "/courses"
    },

    getGetAllSectionsForCourseURL: function(courseID) {
        return REQUEST_URL + "/" + courseID + "/sections"
    },

    getCourseFromResponse: function(err, res, body) {
        return body.course;
    }, 
    getCoursesFromResponse: function(err, res, body) {
        return body.courses;
    }
}