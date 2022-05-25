var server = require("../../../../server.js");
var assert = require('chai').assert;
var helper = require("./helper.js");
var globalHelper = require("../../../globalHelper.js");
// This require automatically launches the server
const request = require('request');
const reqURL = helper.REQUEST_URL + "/templates";

module.exports.runTests = runTests;

function runTests(token) {
    var options = {};
    options.headers = globalHelper.getAuthorizationHeader(token);
    context('Valid Requests', function() {
        it('Get templates', function(done) {
            request.get(reqURL, options, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkValidResponse(err, res, body);
                var rubrics = helper.getRubricsFromResponse(err, res, body);
                assert.equal(rubrics.length, 1, "Number of Template Rubrics");

                var rubric = rubrics[0];
                assert.equal(rubric.id, 2, "Rubric ID");
                assert.equal(rubric.name, "Rubric 2 Template", "Rubric Name");
                assert.equal(rubric.description, "Description for rubric 2", "Rubric Description");
                assert.equal(rubric.is_template, 1, "Rubric 'is template' status");
                assert.isNull(rubric.user_id, "Rubric User ID");

                done();
            });
        });
    });

}