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
        it('Get assignment with id 1', function(done) {
            request.get(reqURL +"/1", options, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkValidResponse(err, res, body);

                var assignment = helper.getAssignmentFromResponse(err, res, body);

                assert.equal(assignment.id, 1, "Assignment ID");
                assert.equal(assignment.name, "Assignment 1", "Assignment name");
                assert.equal(assignment.description, "This is the description for assignment 1...", "Assignment description");
                assert.equal(assignment.status, "Active", "Assignment Status");
                assert.equal(assignment.start_date, "2019-09-01T04:00:00.000Z", "Assignment start date");
                assert.equal(assignment.due_date, "2019-09-08T04:00:00.000Z", "Assignment due date");
                assert.equal(assignment.rubric_id, 1, "Assigment's rubric id");
                done();
            });
        });
    });

    context('Invalid Requests', function() {
        it('Get assignment with id -1', function(done) {
            request.get(reqURL +"/-1", options, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkInvalidResponse(err, res, body);
                done();
            });
        });

        it('Get assignment with no id', function(done) {
            request.get(reqURL +"/", options, function (err,res,body) {
                globalHelper.checkInvalidResponseHTML(err, res, body);
                done();
            });
        });

        it('Get assignment with id 1000 (Doesn\'t exist)', function(done) {
            request.get(reqURL +"/1000", options, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkInvalidResponse(err, res, body);
                done();
            });
        });
    });
}
