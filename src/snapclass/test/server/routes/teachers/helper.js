const TEACHER_ROLE = 2;
var globalHelper = require("../../../globalHelper.js");
const REQUEST_URL = globalHelper.BASE_URL + "/users";
const request = require('request');

module.exports = {

    TEACHER_ROLE: TEACHER_ROLE,
    REQUEST_URL: REQUEST_URL,
    // Helper function to get options involving teachers
    getTeacherAddOptions: function(name, prefName, email) {
        var opts = {};
        opts.json =
        {
            user: {
                name: name,
                username: email,
                preferred_name: prefName,
                email: email
            },
            role: {
                role_id: TEACHER_ROLE
            }
        };
        return opts;
    },

    getTeacherInfoFromResponse: function(err, res, body) {
        return body.user;
    },

    setTeacherOptionValue: function(options, toChange, newValue) {
        options.json[toChange] = newValue;
    },

    getTeacher2LoginOptions() {
        var opts = {};
        opts.json = {
            username: "scteacher2",
            pswd: "snapclass"
        }
        return opts;
    },

    getTeacher1UpdateInfoOptions: getTeacher1UpdateInfoOptions,

    getTeacher1UpdatePasswordOptions: getTeacher1UpdatePasswordOptions,

    getRestoreTeacher1Options: function(token, oldP) {
        var options1 = getTeacher1UpdateInfoOptions(token, "scteacher1", "teacher1", "teacher1");
        var options2 = getTeacher1UpdatePasswordOptions(token, oldP, "password", "password");
        return [options1, options2];
    },

    getAuthenticationHeader: function (token) {
        opts = {};
        opts.headers = {
            authorization: "Bearer " + token,
            'Content-Type': 'application/json'
        }
        return opts;
    },
    getCoursesFromResponse(err, res, body) {
        return body.courses;
    },
    getRubricsFromResponse(err, res, body) {
        return body.rubrics;
    },
    getCategoriesFromResponse(err, res, body) {
        return body.categories;
    },

}

function getTeacher1UpdateInfoOptions(token, username, name, prefName) {
    opts = {};
    opts.headers = globalHelper.getAuthorizationHeader(token);
    opts.json = {
        username: username,
        name: name,
        preferred_name: prefName
    }
    return opts;
}

function getTeacher1UpdatePasswordOptions(token, oldP, newP, newPC) {
    opts = {};
    opts.headers = opts.headers = globalHelper.getAuthorizationHeader(token);
    opts.json =
    {
        oldPassword: oldP,
        newPassword: newP,
        newPasswordConfirm: newPC
    }
    return opts;
}
