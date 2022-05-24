/**
 * These tests may need to be fixed after berkely login change
 */
var server = require("../../../../server.js");
var assert = require('chai').assert;
var helper = require("./helper.js");
var globalHelper = require("../../../globalHelper.js");
// This require automatically launches the server
const request = require('request');
const reqURL = helper.REQUEST_URL + "/login";

module.exports.runTests = runTests;

function runTests(token) {
    var options = helper.getTeacher2LoginOptions();
    context('Valid Requests', function(done) {
        it('Log in as teacher2', function(done) {
            request.post(reqURL, options, function (err,res,body) {
                globalHelper.checkValidResponse(err, res, body);
                assert.exists(body.token, "Login Token");

                var teacher = helper.getTeacherInfoFromResponse(err, res, body);
                assert.exists(teacher);
                assert.equal(teacher.id, 2);
                assert.equal(teacher.username, "scteacher2");
                assert.equal(teacher.name, "teacher2");
                assert.equal(teacher.preferred_name, "teacher2");
                done();
            });

        });
    });
    //Not sure if these tests down actually work
    context('Invalid Requests', function(done) {
        var options2 = helper.getTeacher2LoginOptions();
        it('Invalid email (no "@website.com)"', function(done) {
            helper.setTeacherOptionValue(options2, "username", "t2");
            request.post(reqURL, options2, function (err,res,body) {
                assert.equal(res.statusCode, 400, "Response code should be 400");
                assert.isUndefined(body.token, "Login Token");
                var teacher = helper.getTeacherInfoFromResponse(err, res, body);
                assert.isUndefined(teacher);
                done();
            });
        });
        var options3 = helper.getTeacher2LoginOptions();
        helper.setTeacherOptionValue(options3, "username", null);
        it('Invalid email (null email)"', function(done) {
            request.post(reqURL, options3, function (err,res,body) {
                assert.equal(res.statusCode, 400, "Response code should be 400");
                assert.isUndefined(body.token, "Login Token");
                var teacher = helper.getTeacherInfoFromResponse(err, res, body);
                assert.isUndefined(teacher);
                done();
            });
        });

        var options5 = helper.getTeacher2LoginOptions();
        helper.setTeacherOptionValue(options5, "pswd", "badPassword");
        it('Invalid password (wrong password)"', function(done) {
            request.post(reqURL, options5, function (err,res,body) {
                assert.equal(res.statusCode, 400, "Response code should be 400");
                assert.isUndefined(body.token, "Login Token");
                var teacher = helper.getTeacherInfoFromResponse(err, res, body);
                assert.isUndefined(teacher);
                done();
            });
        });
        var options6 = helper.getTeacher2LoginOptions();
        helper.setTeacherOptionValue(options6, "username", "t3@gtest.com");
        it('Invalid username (Valid format but doesn\'t exist)', function(done) {
            request.post(reqURL, options6, function (err,res,body) {
                assert.equal(res.statusCode, 400, "Response code should be 400");
                assert.isUndefined(body.token, "Login Token");
                var teacher = helper.getTeacherInfoFromResponse(err, res, body);
                assert.isUndefined(teacher);
                done();
            });
        });
    });
}
