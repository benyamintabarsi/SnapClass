var assert = require('chai').assert;
var helper = require("./helper.js");
var globalHelper = require("../../../globalHelper.js");
const request = require('request');
const reqURL = helper.REQUEST_URL;


module.exports.runTests = runTests;

function runTests(token) {
    context('Valid Requests', function() {
        it('Update category with id 1', function(done) {
            var options = helper.getCategoryUpdateOptions(token, "Update name", "Updated Objective");
            request.put(reqURL +"/1", options, function (err,res,body) {
                globalHelper.checkValidResponse(err, res, body);
                done();
            });
        });
        
        it('Confirm Category 1 was updated (Relies on GET Category)', function(done) {
            var options = {};
            options.headers = globalHelper.getAuthorizationHeader(token);
            request.get(reqURL +"/1", options, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkValidResponse(err, res, body);
                
                var category = helper.getCategoryFromResponse(err, res, body);

                assert.equal(category.name, "Update name", "Category name should have been updated");
                assert.equal(category.learning_objective, "Updated Objective", "Category learning objective should have been updated");

                done();
            });
        });
    });
    context('Invalid Requests', function() {
        it('Update category with id 1 to have null name and objective', function(done) {
            var options = helper.getCategoryUpdateOptions(token, null, null);
            request.put(reqURL +"/1", options, function (err,res,body) {
                globalHelper.checkInvalidResponse(err, res, body);
                done();
            });
        });
    });
}

