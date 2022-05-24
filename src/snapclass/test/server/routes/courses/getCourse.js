var assert = require('chai').assert;
var helper = require("./helper.js");
var globalHelper = require("../../../globalHelper.js");
const request = require('request');
const reqURL = helper.REQUEST_URL;

module.exports.runTests = runTests;

function runTests(token) {
    var options = {};
    options.headers = globalHelper.getAuthorizationHeader(token);

    context('Valid Requests', function() {
        it('Get course with id 1', function(done) {
            request.get(reqURL +"/1", options, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkValidResponse(err, res, body);

                var course = helper.getCourseFromResponse(err, res, body);
                assert.equal(course.id, 1, "Course ID");
                assert.equal(course.name, "AP CS-01", "Course Name");
                assert.equal(course.status, 1, "Course Status");
                assert.equal(course.description, "Intro CS I", "Course Description");
                assert.equal(course.user_id, 1, "Course User ID");
                assert.equal(course.start_date, "2019-08-15T04:00:00.000Z", "Course start date");
                assert.equal(course.end_date, "2019-12-15T05:00:00.000Z", "Course end date");
                done();
            });
        });
    });
    context('Invalid Requests', function() {
        it('Get course with id 100 (Does not exist)', function(done) {
            request.get(reqURL +"/100", options, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkInvalidResponse(err, res, body);
                assert.equal(res.statusCode, 404, "Response code should be 404 Not Found");
                var course = helper.getCourseFromResponse(err, res, body);
                assert.isUndefined(course, "Course should be undefined");
                assert.equal(body.message, "Course not found", "Server response message");
                done();
            });
        });
    });
}
