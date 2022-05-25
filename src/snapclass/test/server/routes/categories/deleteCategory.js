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
        it('Delete Category with id 2', function(done) {
            request.delete(reqURL +"/2", options, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkValidResponse(err, res, body);
                done();
            });
        });
        it('Confirm Category 2 was deleted (Relies on GET Category)', function(done) {
            request.get(reqURL +"/2", options, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkInvalidResponse(err, res, body);
                assert.equal(res.statusCode, 404, "Category response should be 404 Not Found after deletion");
                done();
            });
        });
    });
    context('Invalid Requests', function() {
        it('Delete Category with id 200 (Does not exist)', function(done) {
            request.delete(reqURL +"/200", options, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkInvalidResponse(err, res, body);
                assert.equal(res.statusCode, 404, "Response code should be 404 Not Found");
                assert.equal(body.message, "Category not found, nothing was deleted.", "Response message");
                done();
            });
        });
    });
}

