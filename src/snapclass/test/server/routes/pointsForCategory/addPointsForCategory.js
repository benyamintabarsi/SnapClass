var server = require("../../../../server.js");
var assert = require('chai').assert;
var helper = require("./helper.js");
var globalHelper = require("../../../globalHelper.js");
// This require automatically launches the server
const request = require('request');
const reqURL = helper.REQUEST_URL;

module.exports.runTests = runTests;

function runTests(token) {
    context('Valid Requests', function() {
        var options = helper.getAddPointsOptions(token, 1, 1, "back end test point");
        it('Add Point with value 1 to Category 1', function(done) {
            request.post(reqURL, options, function (err,res,body) {
                globalHelper.checkValidResponse(err, res, body);
                assert.equal(body.message, "Points for category successfully added!");
                done();
            });
        });
    });
}