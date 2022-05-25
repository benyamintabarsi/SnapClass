var globalHelper = require("../../../globalHelper.js");
const REQUEST_URL = globalHelper.BASE_URL + "/assignments";

module.exports = {
    REQUEST_URL: REQUEST_URL,

    getAssignmentFromResponse: function(err, res, body) {
        return body.assignment;
    },

    getAssignmentAddOptions: function(token, name, desc, start, due, status, rubric, section, environment) {
        var opts = {};
        opts.headers = globalHelper.getAuthorizationHeader(token);
        opts.json = {
            "assignment": {
                "name": name,
                "description": desc,
                "start_date": start,
                "due_date": due,
                "status": status,
                "rubric_id": rubric,
                "environment": environment
            },
            "section": {
                "section_id": section
            }
        }
        return opts;
    },

    getAssignmentUpdateOptions: function(token, name, desc, start, due, status, rubric) {
        var opts = {};
        opts.headers = globalHelper.getAuthorizationHeader(token);
        opts.json = {
            "name": name,
            "description": desc,
            "start_date": start,
            "due_date": due,
            "status": status,
            "rubric_id": rubric
        }
        return opts;
    }
}
