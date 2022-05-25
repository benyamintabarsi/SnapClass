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
    var url = helper.getGetStudentsForSectionURL(1);
    context('Valid Requests', function() {
        it('Get Students for Section with id 1', function(done) {
            request.get(url, options, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkValidResponse(err, res, body);
                var students = helper.getStudentsInSectionFromResponse(err, res, body);
                assert.equal(students.length, 2, "Should be 2 Students in Section 1");

                var student = students[0];
                assert.equal(student.id, 5, "Student 1 ID");

                var student = students[1];
                assert.equal(student.id, 6, "Student 2 ID");

                done();
            });
        });

        var url2 = helper.getGetStudentsForSectionURL(30);
        it('Get Students for Section with id 30', function(done) {
            request.get(url2, options, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkInvalidResponse(err, res, body);
                assert.equal(res.statusCode, 404, "Response code should be 404 Not Found");
                var students = helper.getStudentsInSectionFromResponse(err, res, body);
                assert.isUndefined(students, "Should be no Students in Section 30");

                done();
            });
        });
    });
    context('Invalid Requests', function() {
        var url2 = helper.getGetStudentsForSectionURL(-5);
        it('Get Students for Section with id -5', function(done) {
            request.get(url2, options, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkInvalidResponse(err, res, body);
                assert.equal(res.statusCode, 404, "Response code should be 404 Not Found");
                var students = helper.getStudentsInSectionFromResponse(err, res, body);
                assert.isUndefined(students, "Should be no Students in Section -5");
                done();
            });
        });
    });
}

