var assert = require('chai').assert;
var helper = require("./helper.js");
var globalHelper = require("../../../globalHelper.js");
const request = require('request');
const reqURL = helper.REQUEST_URL;

module.exports.runTests = runTests;


function runTests(token) {
    var options1 = helper.getAssignmentAddOptions(token, "Add Assignment API Test Assignment", "Test Desc", "2999-01-01", "2999-05-02", 1, 1, 1, "Snap");
    var options2 = {};
    options2.headers = globalHelper.getAuthorizationHeader(token);

    context('Valid Requests', function() {
        it('Add valid assignment', function(done) {
            request.post(reqURL, options1, function (err,res,body) {
                globalHelper.checkValidResponse(err, res, body);
                var message = globalHelper.getMessageFromResponse(err, res, body);
                assert.equal(message, "Assignment successfully created!");
                done();
            });
        });

        it('Confirm valid assignment was actually added (relies on GET Assignment)', function(done) {
            request.get(reqURL +"/8", options2, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkValidResponse(err, res, body);

                var assignment = helper.getAssignmentFromResponse(err, res, body);

                assert.equal(assignment.id, 8, "Assignment ID");
                assert.equal(assignment.name, "Add Assignment API Test Assignment", "Assignment name");
                assert.equal(assignment.description, "Test Desc", "Assignment description");
                assert.equal(assignment.status, "Active", "Assignment Status");
                assert.equal(assignment.start_date, "2999-01-01T05:00:00.000Z", "Assignment start date");
                assert.equal(assignment.due_date, "2999-05-02T04:00:00.000Z", "Assignment due date");
                assert.equal(assignment.environment, "Snap", "Assignment's environment");
                assert.equal(assignment.rubric_id, 1, "Assigment's rubric id");
                done();
            });
        });
    });

    context('Invalid Requests', function() {
        it('Everything is null', function(done) {
            var options = helper.getAssignmentAddOptions(token, null, null, null, null, null, null, null, null);
            request.post(reqURL, options, function (err,res,body) {
                globalHelper.checkInvalidResponse(err, res, body);
                done();
            });
        });
        it('Null start date', function(done) {
            var options = helper.getAssignmentAddOptions(token, "Test: Null Start Date", "Test Desc", null, "2999-05-02", "Snap", 1, 1, 1);
            request.post(reqURL, options, function (err,res,body) {
                globalHelper.checkInvalidResponse(err, res, body);
                done();
            });
        });
    });
}
