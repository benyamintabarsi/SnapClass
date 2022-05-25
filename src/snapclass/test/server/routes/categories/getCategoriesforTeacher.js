var server = require("../../../../server.js");
var assert = require('chai').assert;
var helper = require("./helper.js");
var globalHelper = require("../../../globalHelper.js");
// This require automatically launches the server
const request = require('request');

module.exports.runTests = runTests;

function runTests(token, token2) {

    var options = {};
    options.headers = globalHelper.getAuthorizationHeader(token);
    var url = helper.getGetCategoriesForTeacherURL(1);
    context('Valid Requests', function() {
        it('Get Rubric Categories for Teacher with id 1', function(done) {
            request.get(url, options, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkValidResponse(err, res, body);
                var categories = body.categories;
                assert.equal(categories.length, 1, "Number of Categories");
                var category = categories[0];
                assert.equal(category.id, 1, "Category ID");
                assert.equal(category.name, "Abstraction", "Category Name");
                assert.equal(category.learning_objective, "EK 2.2.1C Abstraction generalizes...", "Category Learning Objective");
                assert.equal(category.min_point, 0, "Category Min Points");
                assert.equal(category.max_point, 15, "Category Max Points");
                assert.equal(category.point_scale, 1, "Category Point Scale");
                done();
            });
        });
        var options2 = {};
        options2.headers = globalHelper.getAuthorizationHeader(token2);
        var url2 = helper.getGetCategoriesForTeacherURL(4);
        it('Get Rubric Categories for Teacher with id 2', function(done) {
            request.get(url2, options2, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkInvalidResponse(err, res, body);
                assert.equal(res.statusCode, 404, "Status code should be 404 Not Found");
                var categories = body.categories;
                assert.isUndefined(categories, "Teacher 2 should not have any categories");
                done();
            });
        });
    });

}
