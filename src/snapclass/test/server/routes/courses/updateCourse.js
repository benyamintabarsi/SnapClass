var assert = require('chai').assert;
var helper = require("./helper.js");
var globalHelper = require("../../../globalHelper.js");
const request = require('request');
const reqURL = helper.REQUEST_URL;

module.exports.runTests = runTests;

function runTests(token) {
    context('Valid Requests', function() {
        var options = helper.getUpdateCourseOptions(token, "APITESTCOURSE", "2119-01-01", "2119-02-02", 1, 1, 1);
        it('Update all Course info', function(done) {
            request.put(reqURL + "/1", options, function (err,res,body) {
                globalHelper.checkValidResponse(err, res, body);
                done();
            });
        });
        it('Confirm Course info was updated (Relies on GET Course)', function(done) {
            var options = {};
            options.headers = globalHelper.getAuthorizationHeader(token);
            request.get(reqURL +"/1", options, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkValidResponse(err, res, body);

                var course = helper.getCourseFromResponse(err, res, body);
                assert.equal(course.id, 1, "Course ID");
                assert.equal(course.name, "APITESTCOURSE", "Course Name");
                assert.equal(course.status, 1, "Course Status");
                assert.equal(course.description, "Intro CS I", "Course Description");
                assert.equal(course.user_id, 1, "Course User ID");
                assert.equal(course.start_date, "2119-01-01T05:00:00.000Z", "Course start date");
                assert.equal(course.end_date, "2119-02-02T05:00:00.000Z", "Course end date");
                done();
            });
        });
    });
    context('Invalid Requests', function() {
        var options = helper.getUpdateCourseOptions(token, null, "2119-01-01", "2119-02-02", 1, 1, 1);
        it('Update Course 1 name to null', function(done) {
            request.put(reqURL + "/1", options, function (err,res,body) {
                globalHelper.checkInvalidResponse(err, res, body);
                done();
            });
        });
    });
}
