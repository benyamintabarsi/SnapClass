var assert = require('chai').assert;
var helper = require("./helper.js");
var globalHelper = require("../../../globalHelper.js");
const request = require('request');
const reqURL = helper.REQUEST_URL;

module.exports.runTests = runTests;

function runTests(token, token2) {
    var options = {};
    options.headers = globalHelper.getAuthorizationHeader(token);

    context('Valid Requests', function() {
        it('Get all Courses for Teacher with id 1', function(done) {
            var url = helper.getGetAllCoursesForTeacherURL(1);
            request.get(url, options, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkValidResponse(err, res, body);

                var courses = helper.getCoursesFromResponse(err, res, body);

                assert.equal(courses.length, 2, "Number of courses for Teacher 1");

                var course = courses[0];
                assert.equal(course.id, 1, "Course 1 ID");
                assert.equal(course.name, "AP CS-01", "Course 1 Name");
                assert.equal(course.status, 1, "Course 1 Status");
                assert.equal(course.description, "Intro CS I", "Course 1 Description");
                assert.equal(course.user_id, 1, "Course 1 User ID");
                assert.equal(course.start_date, "2019-08-15T04:00:00.000Z", "Course 1 start date");
                assert.equal(course.end_date, "2019-12-15T05:00:00.000Z", "Course 1 end date");

                course = courses[1];
                assert.equal(course.id, 2, "Course 2 ID");
                assert.equal(course.name, "AP CS-03", "Course 2 Name");
                assert.equal(course.status, 1, "Course 2 Status");
                assert.equal(course.description, "Intro CS III", "Course 2 Description");
                assert.equal(course.user_id, 1, "Course 2 User ID");
                assert.equal(course.start_date, "2019-08-15T04:00:00.000Z", "Course 2 start date");
                assert.equal(course.end_date, "2019-12-15T05:00:00.000Z", "Course 2 end date");

                done();
            });
        });
        it('Get all Courses for Teacher with id 3', function(done) {
            var url = helper.getGetAllCoursesForTeacherURL(3);
            request.get(url, options, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkInvalidResponse(err, res, body);
                assert.equal(res.statusCode, 404, "Response code should be 404 Not Found");
                var courses = helper.getCoursesFromResponse(err, res, body);
                assert.isUndefined(courses,  "Teacher 3 should have no courses.");

                done();
            });
        });
    });
}


