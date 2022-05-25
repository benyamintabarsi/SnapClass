var server = require("../../../../server.js");
var assert = require('chai').assert;
var helper = require("./helper.js");
var globalHelper = require("../../../globalHelper.js");
// This require automatically launches the server
const request = require('request');
const reqURL = helper.REQUEST_URL;

module.exports.runTests = runTests;

function runTests(token) {
    var options = {};
    options.headers = globalHelper.getAuthorizationHeader(token);
    context('Valid Requests', function() {
        it('Get Section with id 1', function(done) {
            request.get(reqURL + "/1", options, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkValidResponse(err, res, body);
                var section = helper.getSectionFromResponse(err, res, body);
                assert.equal(section.section_number, "001H", "Section number");
                assert.equal(section.course_id, 1, "Section's Course ID");
                done();
            });
        });
    });
}

