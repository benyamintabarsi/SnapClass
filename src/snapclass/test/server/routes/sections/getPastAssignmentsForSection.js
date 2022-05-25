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
    var url = helper.getPastAssignmentsURL(1);
    context('Valid Requests', function() {
        it('Get past Assignments for Section with id 1', function(done) {
            request.get(url, options, function (err,res,body) {
                //body = JSON.parse(body);
                globalHelper.checkValidResponse(err, res, body);
                done();
            });
        });
    });
}

