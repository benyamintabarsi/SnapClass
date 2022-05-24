var assert = require('chai').assert;
var helper = require("./helper.js");
var globalHelper = require("../../../globalHelper.js");
const request = require('request');
const reqURL = helper.REQUEST_URL + "/delete";

module.exports.runTests = runTests;


function runTests(token) {
    var opts ={};
    opts.headers = globalHelper.getAuthorizationHeader(token);
    context('Valid Requests', function() {
        it('Delete assignment with id 6', function(done) {
            request.delete(reqURL +"/6", opts, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkValidResponse(err, res, body);
                var message = globalHelper.getMessageFromResponse(err, res, body);
                assert.equal(message, "Assignment successfully deleted!", "Response message");
                done();
            });
        });
        it('Confirm assignment 6 was deleted (Relies on GET Assignment)', function(done) {
            request.get(helper.REQUEST_URL +"/6", opts, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkInvalidResponse(err, res, body);
                assert.equal(res.statusCode, 404, "Getting assignment 6 after deletion should return 404 Not Found");
                done();
            });
        });
    });
    context('Invalid Requests', function() {
        it('Delete assignment with id 600 (Doesn\'t exist)', function(done) {
            request.delete(reqURL +"/600", opts, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkInvalidResponse(err, res, body);
                assert.equal(res.statusCode, 404, "Status code should be 404 Not Found");
                var message = globalHelper.getMessageFromResponse(err, res, body);
                assert.equal(message, "Assignment not found, nothing was deleted.", "Response message");
                done();
            });
        });
    });
}
