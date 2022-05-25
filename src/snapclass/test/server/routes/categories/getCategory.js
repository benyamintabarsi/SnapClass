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
        it('Get category with id 1', function(done) {
            request.get(reqURL +"/1", options, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkValidResponse(err, res, body);
                var category = helper.getCategoryFromResponse(err, res, body);
                assert.equal(category.id, 1, "Category ID");
                assert.equal(category.name, "Abstraction", "Category Name");
                assert.equal(category.learning_objective, "EK 2.2.1C Abstraction generalizes...", "Category Learning Objective");
                assert.equal(category.min_point, 0, "Category Min Points");
                assert.equal(category.max_point, 15, "Category Max Points");
                assert.equal(category.point_scale, 1, "Category Point Scale");

                var points = category.points;
                assert.equal(points.length, 2, "Number of Points in Category");

                var p1 = points[0];
                assert.equal(p1.id, 1, "Category Points 1 id");
                assert.equal(p1.points, 10.75, "Category Points 1 points");
                assert.equal(p1.description, "Completing the assignment with minimal errors...", "Category Points 1 description");
                assert.equal(p1.category_id, 1, "Category Points 1 Category ID");

                var p2 = points[1];
                assert.equal(p2.id, 2, "Category Points 2 id");
                assert.equal(p2.points, 15, "Category Points 2 points");
                assert.equal(p2.description, "Completing the assignment with zero errors...", "Category Points 2 description");
                assert.equal(p2.category_id, 1, "Category Points 2 Category ID");

                done();
            });
        });
    });
    context('Invalid Requests', function() {
        it('Get category with id 1000 (Does not exist)', function(done) {
            request.get(reqURL +"/1000", options, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkInvalidResponse(err, res, body);
                var category = helper.getCategoryFromResponse(err, res, body);
                assert.isUndefined(category, "Category should not be defined.");
                assert.equal(res.statusCode, 404, "Status code should be 404 Not Found");
                done();
            });
        });
    });
}

