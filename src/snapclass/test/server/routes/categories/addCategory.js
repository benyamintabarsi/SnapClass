var assert = require('chai').assert;
var helper = require("./helper.js");
var globalHelper = require("../../../globalHelper.js");
const request = require('request');
const reqURL = helper.REQUEST_URL;

module.exports.runTests = runTests;

function runTests(token) {

    context('Valid Requests', function() {
        var options = helper.getCategoryAddOptions(token, "Cat Name", "objective", 1, 0, 12, 2, 1);
        var getOptions = {};
        getOptions.headers = globalHelper.getAuthorizationHeader(token);
        it('Add valid Category', function(done) {
            request.post(reqURL, options, function (err,res,body) {
                globalHelper.checkValidResponse(err, res, body);
                var message = globalHelper.getMessageFromResponse(err, res, body);
                assert.equal(message, "Category successfully created!", "Response message")
                done();
            });
        });
        it('Confirm Category was actually added (relies on GET Category)', function(done) {
            request.get(reqURL +"/3", getOptions, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkValidResponse(err, res, body);
                var category = helper.getCategoryFromResponse(err, res, body);
                assert.equal(category.id, 3, "Category ID");
                assert.equal(category.name, "Cat Name", "Category Name");
                assert.equal(category.learning_objective, "objective", "Category Learning Objective");
                done();
            });
        });
    });
    context('Invalid Requests', function() {
        var options = helper.getCategoryAddOptions(token, null, null, 1, 1);
        var getOptions = {};
        getOptions.headers = globalHelper.getAuthorizationHeader(token);
        it('Add Category with null name and objective', function(done) {
            request.post(reqURL, options, function (err,res,body) {
                globalHelper.checkInvalidResponse(err, res, body);
                done();
            });
        });
    });
}
