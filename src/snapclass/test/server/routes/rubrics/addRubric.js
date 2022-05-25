var assert = require('chai').assert;
var helper = require("./helper.js");
var globalHelper = require("../../../globalHelper.js");
const request = require('request');
const reqURL = helper.REQUEST_URL;

module.exports.runTests = runTests;

function runTests(token) {
        
    var getOptions = {};
    getOptions.headers = globalHelper.getAuthorizationHeader(token);
    context('Valid Requests', function() {
        describe("Non-Template Rubric", function () {
            var options = helper.getRubricAddOptions(token, "API Test Rubric", "This rubric was created to test the add rubric api", false, 1);


            it('Add Non-template Rubric', function(done) {
                request.post(reqURL, options, function (err,res,body) {
                    globalHelper.checkValidResponse(err, res, body);
                    assert.equal(body.message, "Rubric successfully created!", "Server response message");
                    done();
                });
            });

            it('Confirm Non-template Rubric was added (relies on GET Rubric)', function(done) {
                request.get(reqURL +"/3", getOptions, function (err,res,body) {
                    body = JSON.parse(body);
                    globalHelper.checkValidResponse(err, res, body);
                    var rubric = helper.getRubricFromResponse(err, res, body);
    
                    assert.equal(rubric.name, "API Test Rubric", "Rubric Name");
                    assert.equal(rubric.description, "This rubric was created to test the add rubric api", "Rubric Description");
                    assert.equal(rubric.is_template, 0, "Rubric 'is template' status");
                    assert.equal(rubric.user_id, 1, "Rubric User ID");
                    done();
                });
            });
        });
        

        describe("Template Rubric", function () {
            var options2 = helper.getRubricAddOptions(token, "API Test Rubric 2", "test template rubric", true, 1);
            it('Add Template rubric', function(done) {
                request.post(reqURL, options2, function (err,res,body) {
                    globalHelper.checkValidResponse(err, res, body);
                    assert.equal(body.message, "Rubric successfully created!", "Server response message");
                    done();
                });
            });
            it('Confirm Template Rubric was added (relies on GET Rubric)', function(done) {
                request.get(reqURL +"/4", getOptions, function (err,res,body) {
                    body = JSON.parse(body);
                    globalHelper.checkValidResponse(err, res, body);
                    var rubric = helper.getRubricFromResponse(err, res, body);

                    assert.equal(rubric.name, "API Test Rubric 2", "Rubric Name");
                    assert.equal(rubric.description, "test template rubric", "Rubric Description");
                    assert.equal(rubric.is_template, 1, "Rubric 'is template' status");
                    assert.isNull(rubric.user_id, "Rubric User ID");
                    done();
                });
            });
        });
    });

    context('Invalid Requests', function() {
        var options = helper.getRubricAddOptions(token, "API Test Rubric 3", "This rubric is invalid", false, null);
        it('Non-template rubric with null user id', function(done) {
            request.post(reqURL, options, function (err,res,body) {
                globalHelper.checkInvalidResponse(err, res, body);
                done();
            });
        });
    });
}
