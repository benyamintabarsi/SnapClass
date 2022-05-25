var server = require("../../../../server.js");
var assert = require('chai').assert;
var helper = require("./helper.js");
var globalHelper = require("../../../globalHelper.js");
// This require automatically launches the server
const request = require('request');
const reqURL = helper.REQUEST_URL;

module.exports.runTests = runTests;

function runTests(token) {
    var options = helper.getAssignmentUpdateOptions(token, "Update Test", "Test Desc Update", "2888-01-01", "2888-05-02", 1, 1);
    var options1 = {};
    options1.headers = globalHelper.getAuthorizationHeader(token);
    context('Valid Requests', function() {
        it('Update assignment 2', function(done) {
            request.put(reqURL + "/2", options, function (err,res,body) {
                globalHelper.checkValidResponse(err, res, body);
                done();
            });
        });

        it('Confirm assignment updates worked (relies on GET Assignment)', function(done) {
            request.get(reqURL +"/2", options1, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkValidResponse(err, res, body);

                var assignment = helper.getAssignmentFromResponse(err, res, body);

                assert.equal(assignment.id, 2, "Assignment ID");
                assert.equal(assignment.name, "Update Test", "Assignment name");
                assert.equal(assignment.description, "Test Desc Update", "Assignment description");
                assert.equal(assignment.status, "Active", "Assignment Status");
                assert.equal(assignment.start_date, "2888-01-01T05:00:00.000Z", "Assignment start date");
                assert.equal(assignment.due_date, "2888-05-02T04:00:00.000Z", "Assignment due date");
                assert.equal(assignment.rubric_id, 1, "Assigment's rubric id");
                done();
            });
        });
    });

    context('Invalid Requests', function() {
        var options2 = helper.getAssignmentUpdateOptions(token, "Update Test", "Test Desc Update", null, null, 1, 1);
        var options3 = helper.getAssignmentUpdateOptions(token, null, null, null,null, -3, -2);
        it('Null start date', function(done) {
            request.put(reqURL + "/2", options2, function (err,res,body) {
                //body = JSON.parse(body);
                globalHelper.checkInvalidResponse(err, res, body);
                done();
            });
        });

        it('Empty update data', function(done) {
            request.put(reqURL + "/2", options3, function (err,res,body) {
                //body = JSON.parse(body);
                globalHelper.checkInvalidResponse(err, res, body);
                done();
            });
        });
    });
}
