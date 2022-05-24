var globalHelper = require("../../../globalHelper.js");
const REQUEST_URL = globalHelper.BASE_URL + "/rubrics";

module.exports = {
    REQUEST_URL: REQUEST_URL,
    
    getRubricAddOptions: function (token, name, desc, isTemplate, userID) {
        var opts = {};
        opts.headers = globalHelper.getAuthorizationHeader(token);
        opts.json = {
            user_id: userID,
            name: name,
            description: desc,
            is_template: isTemplate
        }
        return opts;
    },
    getRubricUpdateOptions: function (token, name, desc) {
        var opts = {};
        opts.headers = globalHelper.getAuthorizationHeader(token);
        opts.json = {
            name: name,
            description: desc
        }
        return opts;
    },


    getRubricFromResponse: function(err, res, body) {
        return body.rubric;
    },
    getRubricsFromResponse: function(err, res, body) {
        return body.rubrics;
    },
    getRubricCategoriesFromResponse: function(err, res, body) {
        return body.categories;
    }
}
