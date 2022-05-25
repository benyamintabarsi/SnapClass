var assert = require('chai').assert;
var helper = require("./helper.js");
var globalHelper = require("../../../globalHelper.js");
const request = require('request');
const reqURL = globalHelper.BASE_URL + "/teachers/1/rubrics";
const reqURL2 = globalHelper.BASE_URL + "/teachers/2/rubrics";
module.exports.runTests = runTests;
function runTests(token, token2) {
    var options = {};
    options.headers = globalHelper.getAuthorizationHeader(token);

    var options2 = {};
    options2.headers = globalHelper.getAuthorizationHeader(token2);

    context('Valid Requests', function() {
        it('Get rubrics for teacher with id 1', function(done) {
            request.get(reqURL, options, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkValidResponse(err, res, body);
                var rubrics = helper.getRubricsFromResponse(err, res, body);
                assert.equal(rubrics.length, 1, "Teacher 1 should have 1 rubric");

                var rubric = rubrics[0];
                assert.equal(rubric.name, "Rubric 1", "Rubric Name");
                assert.equal(rubric.description, "Description for rubric 1", "Rubric Description");
                assert.equal(rubric.is_template, 0, "Rubric 'is template' status");
                assert.equal(rubric.user_id, 1, "Rubric User ID");
                done();
            });
        });

        it('Get rubrics for teacher with id 2', function(done) {
            request.get(reqURL2, options2, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkInvalidResponse(err, res, body);
                assert.equal(res.statusCode, 404, "Response code should be 404 not found");
                var rubrics = helper.getRubricsFromResponse(err, res, body);
                assert.isUndefined(rubrics, "Teacher 2 should have no rubrics");
                done();
            });
        });
    });
}
