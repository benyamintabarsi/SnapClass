var server = require("../../../../server.js");
var assert = require('chai').assert;
var helper = require("./helper.js");
var globalHelper = require("../../../globalHelper.js");
// This require automatically launches the server
const request = require('request');
const reqURL = helper.REQUEST_URL;

module.exports.runTests = runTests;

function runTests(token) {
    describe('Update Points for Category', function() {
        context('Valid Requests', function() {
            var options = helper.getUpdatePointsOptions(token, 2, "updated amount");
            it('Update points with id 2', function(done) {
                request.put(reqURL + "/2", options, function (err,res,body) {
                    globalHelper.checkValidResponse(err, res, body);
                    assert.equal(body.message, "Points for category successfully updated!");
                    done();
                });
            });
        });
    });
}