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
        it('Get rubric with id 1', function(done) {

            request.get(reqURL +"/1", options, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkValidResponse(err, res, body);
                var rubric = helper.getRubricFromResponse(err, res, body);
                assert.equal(rubric.name, "Rubric 1", "Rubric Name");
                assert.equal(rubric.description, "Description for rubric 1", "Rubric Description");
                assert.equal(rubric.is_template, 0, "Rubric 'is template' status");
                assert.equal(rubric.user_id, 1, "Rubric User ID");

                done();
            });
        });
    });
    context('Invalid Requests', function() {
        it('Get rubric with id 100000', function(done) {
            request.get(reqURL +"/100000", options, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkInvalidResponse(err, res, body);
                assert.equal(res.statusCode, 404, "Status code should be 404 Not Found");
                done();
            });
        });
    });
}