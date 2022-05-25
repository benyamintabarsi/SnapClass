var assert = require('chai').assert;
var helper = require("./helper.js");
var globalHelper = require("../../../globalHelper.js");
const request = require('request');
const reqURL = helper.REQUEST_URL;

module.exports.runTests = runTests;

function runTests(token) {

    var options = {};
    options.headers = globalHelper.getAuthorizationHeader(token);

    context('Valid Requests', function() {
        it('Delete Rubric with id 1', function(done) {
            request.delete(reqURL +"/1", options, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkValidResponse(err, res, body);
                done();
            });
        });


        it('Confirm Rubric 1 was deleted (relies on GET Rubric)', function(done) {
            request.get(reqURL +"/1", options, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkInvalidResponse(err, res, body);
                var rubric = helper.getRubricFromResponse(err, res, body);
                assert.equal(res.statusCode, 404, "Response code should be 404 Not Found");
                assert.isUndefined(rubric, "Rubric should be undefined");

                done();
            });
        });
    });
    context('Invalid Requests', function() {
        it('Delete rubric with id 100000', function(done) {
            request.delete(reqURL +"/100000", options, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkInvalidResponse(err, res, body);
                done();
            });
        });
    });
}