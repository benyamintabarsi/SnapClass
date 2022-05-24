var server = require("../../../../server.js");
var assert = require('chai').assert;
var helper = require("./helper.js");
var globalHelper = require("../../../globalHelper.js");
// This require automatically launches the server
const request = require('request');
const reqURL = helper.REQUEST_URL;

module.exports.runTests = runTests;

function runTests(token) {
    describe('Delete Point for Category', function() {
        context('Valid Requests', function() {
            var options = {};
            options.headers = globalHelper.getAuthorizationHeader(token);
            it('Delete Points with id 1', function(done) {
                request.delete(reqURL + "/1", options, function (err,res,body) {
                    body = JSON.parse(body);
                    globalHelper.checkValidResponse(err, res, body);
                    assert.equal(body.message, "Points for category successfully deleted");
                    done();
                });
            });
        });
    });
}