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
    var url = helper.getGetAssignmentsForSectionURL(1);
    context('Valid Requests', function() {
        it('Get Assignments for Section with id 1', function(done) {
            request.get(url, options, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkValidResponse(err, res, body);

                var assignments = helper.getAssignmentsInSectionFromResponse(err, res, body);
                assert.equal(assignments.length, 6, "Section 1 should have 6 Assignments");

                assignments.sort(function (a, b) {
                    return a.id - b.id;
                });
                var assignment = assignments[0];
                assert.equal(assignment.id, 1, "Assignment ID");
                assert.equal(assignment.name, "Assignment 1", "Assignment name");
                assert.equal(assignment.description, "This is the description for assignment 1...", "Assignment description");
                assert.equal(assignment.status, "Active", "Assignment Status");
                assert.equal(assignment.start_date, "2019-09-01T04:00:00.000Z", "Assignment start date");
                assert.equal(assignment.due_date, "2019-09-08T04:00:00.000Z", "Assignment due date");
                //assert.equal(assignment.rubric_id, 1, "Assigment's rubric id");

                assignment = assignments[4];
                assert.equal(assignment.id, 5, "Assignment ID");
                assert.equal(assignment.name, "Turtles", "Assignment name");
                assert.equal(assignment.description, "This is the description for turtling", "Assignment description");
                assert.equal(assignment.status, "Active", "Assignment Status");
                assert.equal(assignment.start_date, "2019-09-08T04:00:00.000Z", "Assignment start date");
                assert.equal(assignment.due_date, "2019-02-25T05:00:00.000Z", "Assignment due date");
                //assert.equal(assignment.rubric_id, 1, "Assigment's rubric id");

                done();
            });
        });
        var url2 = helper.getGetAssignmentsForSectionURL(5);
        it('Get Assignments for Section with id 5', function(done) {
            request.get(url2, options, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkValidResponse(err, res, body);

                var assignments = helper.getAssignmentsInSectionFromResponse(err, res, body);
                assert.equal(assignments.length, 0, "Section 5 should have 0 Assignments");
                //Test should be fixed to be an invalid response
                // globalHelper.checkInvalidResponse(err, res, body);
                // assert.equal(res.statusCode, 404, "Response status code");
                // assert.equal(body.message, "No assignments found for section 5", "Response message");
                // var assignments = helper.getAssignmentsInSectionFromResponse(err, res, body);
                // assert.isUndefined(assignments, "Section 5 should have 0 Assignments");
                done();
            });
        });
    });
}

