var assert = require('chai').assert;
var helper = require("./helper.js");
var globalHelper = require("../../../globalHelper.js");
const request = require('request');
const reqURL = helper.REQUEST_URL;

module.exports.runTests = runTests;

function runTests(token) {
    var options = helper.getAddCourseOptions(token, "APITESTCOURSE", "2119-01-01", "2119-02-02", 1, 1, 1);
    var getOptions = {};
    getOptions.headers = globalHelper.getAuthorizationHeader(token);
    context('Valid Requests', function() {
        it('Add valid course', function(done) {
            request.post(reqURL, options, function (err,res,body) {
                //body = JSON.parse(body);
                globalHelper.checkValidResponse(err, res, body);
                var message = globalHelper.getMessageFromResponse(err, res, body);
                assert.equal(message, "Course successfully created!", "Response message");
                done();
            });
        });

        it('Confirm course was actually added (relies on GET Course)', function(done) {
            request.get(reqURL +"/4", getOptions, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkValidResponse(err, res, body);

                var course = helper.getCourseFromResponse(err, res, body);
                assert.equal(course.id, 4, "Course ID");
                assert.equal(course.name, "APITESTCOURSE", "Course Name");
                assert.equal(course.status, 1, "Course Status");
                assert.equal(course.description, null, "Course Description");
                assert.equal(course.user_id, 1, "Course User ID");
                assert.equal(course.start_date, "2119-01-01T05:00:00.000Z", "Course start date");
                assert.equal(course.end_date, "2119-02-02T05:00:00.000Z", "Course end date");
                done();
            });
        });
    });

    var options2 = helper.getAddCourseOptions(token, null, "2119-01-01", "2119-02-02", 1, 1, 1);
    context('Invalid Requests', function() {
        it('Add course with null name', function(done) {
            request.post(reqURL, options2, function (err,res,body) {
                globalHelper.checkInvalidResponse(err, res, body);
                done();
            });
        });
    });
}
