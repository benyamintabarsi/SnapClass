var assert = require('chai').assert;
var helper = require("./helper.js");
var globalHelper = require("../../../globalHelper.js");
const request = require('request');
const reqURL = helper.REQUEST_URL;

module.exports.runTests = runTests;


function runTests(token) {
    context('Valid Requests', function(done) {
        var options = helper.getRubricUpdateOptions(token, "Updated Name", "Updated Desc");
        var getOptions = {};
        getOptions.headers = globalHelper.getAuthorizationHeader(token);
        it('Update Rubric1\'s name and description', function(done) {
            request.put(reqURL + "/1", options, function (err,res,body) {
                globalHelper.checkValidResponse(err, res, body);
                done();
            });
        });
        it('Confirm Rubric 1 was updated', function(done) {
            request.get(reqURL +"/1", getOptions, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkValidResponse(err, res, body);
                rubric = helper.getRubricFromResponse(err, res, body)
                assert.equal(rubric.name, "Updated Name", "Rubric Name");
                assert.equal(rubric.description, "Updated Desc", "Rubric Description");
                assert.equal(rubric.is_template,0, "Rubric 'is template' status");
                assert.equal(rubric.user_id, 1, "Rubric User ID");
                done();
            });
        });
    });


}
