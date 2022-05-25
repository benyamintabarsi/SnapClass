var globalHelper = require("../../../globalHelper.js");
const REQUEST_URL = globalHelper.BASE_URL + "/points";

module.exports = {
    REQUEST_URL: REQUEST_URL,
    getAddPointsOptions: function(token, catID, points, desc) {
        var opts = {};
        opts.headers = globalHelper.getAuthorizationHeader(token);
        opts.json = {
            points: points,
            category_id: catID,
            description: desc
        }
        return opts;
    },
    getUpdatePointsOptions: function(token, pt, desc) {
        var opts = {};
        opts.headers = globalHelper.getAuthorizationHeader(token);
        opts.json = {
            points: pt,
            description: desc
        }
        return opts;
    }
}
