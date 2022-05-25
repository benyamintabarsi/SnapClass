var globalHelper = require("../../../globalHelper.js");
const REQUEST_URL = globalHelper.BASE_URL + "/categories";

module.exports = {
    REQUEST_URL: REQUEST_URL,

    getCategoryAddOptions: function(token, name, objective, userID, minP, maxP, pScale, rubricID) {
        var opts = {};
        opts.headers = globalHelper.getAuthorizationHeader(token);
        opts.json = {
            category: {
                name: name,
                learning_objective: objective,
                min_point: minP,
                max_point: maxP,
                point_scale: pScale
            },
            category_for_teacher: {
                user_id: userID
            },
            category_for_rubric: {
                rubric_id: rubricID
            }
        }
        return opts;
    },
    getCategoryUpdateOptions: function(token, name, objective) {
        var opts = {};
        opts.headers = globalHelper.getAuthorizationHeader(token);
        opts.json = {
            name: name,
            learning_objective: objective
        }
        return opts;
    },
    getCategoryFromResponse(err, res, body) {
        return body.category;
    },
    getGetCategoriesForRubricURL: function(rID) {
        return globalHelper.BASE_URL + "/rubrics/" + rID + "/categories";
    },
    getGetCategoriesForTeacherURL: function(id) {
        return globalHelper.BASE_URL + "/teachers/" + id + "/categories";
    },
}