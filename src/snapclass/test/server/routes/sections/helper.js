var globalHelper = require("../../../globalHelper.js");
const REQUEST_URL = globalHelper.BASE_URL + "/sections";

module.exports = {
    REQUEST_URL: REQUEST_URL,

    getSectionAddOptions: function(token, courseID, secID) {
        var opts = {};
        opts.headers = globalHelper.getAuthorizationHeader(token);
        opts.json = {
            course_id: courseID,
            section_number: secID
        }
        return opts;
    },
    getAddStudentToSectionOptions: function(token, studentID) {
        var opts = {};
        opts.headers = globalHelper.getAuthorizationHeader(token);
        opts.json = {
            user_id: studentID
        }
        return opts;
    },
    
    getGetStudentsForSectionURL:function(sectionID) {
        return globalHelper.BASE_URL + "/sections/" + sectionID + "/students"
    },
    getDeleteStudentFromSectionURL:function(sectionID, userID) {
        return globalHelper.BASE_URL + "/sections/" + sectionID + "/students/" + userID;
    },

    getAssignmentAddToSectionOptions: function(token, assignmentID) {
        var opts = {};
        opts.headers = globalHelper.getAuthorizationHeader(token, assignmentID);
        opts.json = {
            assignment_id: assignmentID
        }
        return opts;
    },
    getAssignmentAddToSectionURL: function(secID) {
        return REQUEST_URL + "/" + secID + "/assignments";
    },

    getUpcomingAssignmentsURL: function(secID) {
        return REQUEST_URL + "/" + secID + "/upcoming/assignments";
    },
    getPastAssignmentsURL: function(secID) {
        return REQUEST_URL + "/" + secID + "/past/assignments";
    },
    getGetAssignmentsForSectionURL: function(secID) {
        return REQUEST_URL + "/" + secID + "/assignments";
    },
    getSectionFromResponse: function(err, res, body) {
        return body.section;
    },
    getStudentsInSectionFromResponse: function(err, res, body) {
        return body.students;
    },
    getAssignmentsInSectionFromResponse: function(err, res, body) {
        return body.assignments;
    },
    getStudentsInSectionFromResponse: function(err, res, body) {
        return body.students;
    }
}
