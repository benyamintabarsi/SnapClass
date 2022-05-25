var assert = require('chai').assert;
var helper = require("./helper.js");
var globalHelper = require("../../../globalHelper.js");
const request = require('request');

module.exports.runTests = runTests;

function runTests(token) {
    var options = helper.getAssignmentAddToSectionOptions(token, 4);
    var getOptions = {};
    getOptions.headers = globalHelper.getAuthorizationHeader(token);

    var url = helper.getAssignmentAddToSectionURL(2);
    context('Valid Requests', function() {
        it('Add Assignment with id 4 to Section 2', function(done) {
            request.post(url, options, function (err,res,body) {
                globalHelper.checkValidResponse(err, res, body);
                assert.equal(body.message, "Assignment successfully added!", "Response message from server");
                done();
            });
        });

        it('Confirm Assignment was added to Section 2 (relies on GET Assignments for Section)', function(done) {
            request.get(url, getOptions, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkValidResponse(err, res, body);
                var assignments = body.assignments;

                var found = false;
                for (var i = 0; i < assignments.length; i++) {
                    if (assignments[i].id == 4) {
                        found = true;
                    }
                }
                assert.isTrue(found, "Should have found Assignment with id 4 in Section 2's Assignments");
                done();
            });
        });
    });
}