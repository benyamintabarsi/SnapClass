var assert = require('chai').assert;
var helper = require("./helper.js");
var globalHelper = require("../../../globalHelper.js");
const request = require('request');

module.exports.runTests = runTests;

function runTests(token, token2) {
    var options = helper.getAssignmentAddToSectionOptions(token, 2);
    var url = helper.getAssignmentAddToSectionURL(3);
    context('Valid Requests', function() {
        it('Delete Assignment with id 2 from Section 3', function(done) {
            request.delete(url, options, function (err,res,body) {
                globalHelper.checkValidResponse(err, res, body);
                done();
            });
        });

        it('Confirm Assignment 2 is no longer in Section 3 (relies on GET AssignmentsFromSection)', function(done) {
            var options2 = {};
            options2.headers = globalHelper.getAuthorizationHeader(token);
            var url = helper.getGetAssignmentsForSectionURL(3);
            request.get(url, options2, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkValidResponse(err, res, body);
                var assignments = helper.getAssignmentsInSectionFromResponse(err, res, body);
                //for (var i = 0; i < assignments.length; i++) {
                    //console.log("Assignment: " + JSON.stringify(assignments[i]));
                //}
                
                assert.equal(assignments.length, 1, "Section 3 should only have 1 Assignment now");
                var found = false;
                for (var i = 0; i < assignments.length; i++) {
                    if (assignments[i].id == 2) {
                        found = true;
                    }
                }
                assert.isFalse(found, "Shouldn't have found Assignment 2 in Section 1")
                done();
            });
        });
    });

    context('Invalid Requests', function() {
        var options = helper.getAssignmentAddToSectionOptions(token, 1000);
        var url = helper.getAssignmentAddToSectionURL(3);
        it('Delete Assignment with id 1000 from Section 3', function(done) {
            request.delete(url, options, function (err,res,body) {
                globalHelper.checkInvalidResponse(err, res, body);
                assert.equal(res.statusCode, 404, "Response status");
                assert.equal(body.message, "Assignment not found, nothing was deleted.", "Response message");
                done();
            });
        });
    });
    context('Diabolical Requests', function() {
        var options = helper.getAssignmentAddToSectionOptions(token2, 4);
        var url = helper.getAssignmentAddToSectionURL(1);
        it('Delete Assignment with id 4 from Section 1 as Teacher 2 (belongs to Teacher 1)', function(done) {
            request.delete(url, options, function (err,res,body) {
                globalHelper.checkInvalidResponse(err, res, body);
                done();
            });
        });
    });
}