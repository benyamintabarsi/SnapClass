var globalHelper = require("../../../globalHelper.js");

module.exports = {
    getURL: getSecByID,
    getAddActiveSectionOptions:function(token, id, secID) {
        var opts = {};
        opts.headers = globalHelper.getAuthorizationHeader(token);
        opts.json = {
            user_id: id,
            section_id: secID
        };
        return opts;
    },
    getActiveSectionFromResponse: function(err, res, body) {
        return body.sectionId;
    }
}
function getSecByID(id) {
    return globalHelper.BASE_URL + "/teachers/" + id + "/active/section"
}
