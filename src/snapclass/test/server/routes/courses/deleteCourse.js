var assert = require('chai').assert;
var helper = require("./helper.js");
var globalHelper = require("../../../globalHelper.js");
const request = require('request');
const reqURL = helper.REQUEST_URL + "/delete";

module.exports.runTests = runTests;

function runTests(token, token2) {
    var options = {};
    options.headers = globalHelper.getAuthorizationHeader(token2);

    context('Valid Requests', function() {
        it('Delete course with id 3', function(done) {
            request.delete(reqURL +"/3", options, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkValidResponse(err, res, body);
                var message = globalHelper.getMessageFromResponse(err, res, body);
                assert.equal(message, "Course successfully deleted", "Server response message");

                done();
            });
        });
        it('Confirm course 3 was deleted (Relies on GET Course)', function(done) {
            request.get(helper.REQUEST_URL +"/3", options, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkInvalidResponse(err, res, body);
                assert.equal(res.statusCode, 404, "Status code after deletion should be 404 Not Found");
                done();
            });
        });
    });
    context('Invalid Requests', function() {
        it('Delete course with id 300 (Does not exist)', function(done) {
            request.delete(reqURL +"/300", options, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkInvalidResponse(err, res, body);
                assert.equal(res.statusCode, 404, "Response code should be 404 Not Found");
                var message = globalHelper.getMessageFromResponse(err, res, body);
                assert.equal(message, "Course not found.", "Server response message");
                done();
            });
        });
    });
}
