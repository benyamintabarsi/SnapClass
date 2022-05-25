var assert = require('chai').assert;
var helper = require("./helper.js");
var globalHelper = require("../../../globalHelper.js");
const request = require('request');

module.exports.runTests = runTests;

function runTests(token, token2) {
    
    var options = {};
    options.headers = globalHelper.getAuthorizationHeader(token);
    var url = helper.getGetCategoriesForRubricURL(1);
    context('Valid Requests', function() {
        it('Get Rubric Categories for Rubric with id 1', function(done) {
            request.get(url, options, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkValidResponse(err, res, body);
                var categories = body.categories;
                assert.equal(categories.length, 2, "Number of Categories");
                var category = categories[0];
                assert.equal(category.id, 2, "Category 1 ID");
                category = categories[1];
                assert.equal(category.id, 1, "Category 2  ID");
                done();
            });
        });
    });

    var url2 = helper.getGetCategoriesForRubricURL(-1);
    context('Valid Requests', function() {
        it('Get Rubric Categories for Rubric with id -1', function(done) {
            request.get(url2, options, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkInvalidResponse(err, res, body);
                assert.equal(res.statusCode, 404, "Response status code should be 404 Not Found");
                assert.equal(body.message, "Rubric not found", "Response message");

                done();
            });
        });
    });
    
}