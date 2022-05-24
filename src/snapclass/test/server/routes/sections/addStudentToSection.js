var server = require("../../../../server.js");
var assert = require('chai').assert;
var helper = require("./helper.js");
var globalHelper = require("../../../globalHelper.js");
// This require automatically launches the server
const request = require('request');
const reqURL = helper.REQUEST_URL;

module.exports.runTests = runTests;

function runTests(token, token2) {
    var options = helper.getAddStudentToSectionOptions(token, 1);
    var url = helper.getGetStudentsForSectionURL(1);
    context('Valid Requests', function() {
        it('Add Student with id 1 to Section 1', function(done) {
            request.post(url, options, function (err,res,body) {
                //body = JSON.parse(body);
                globalHelper.checkValidResponse(err, res, body);
                done();
            });
        });
        it('Confirm Student 1 was added to Section 1 (relies on GET Students for Section)', function(done) {
            var options = {};
            options.headers = globalHelper.getAuthorizationHeader(token);
            var url = helper.getGetStudentsForSectionURL(1);
            request.get(url, options, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkValidResponse(err, res, body);
                var students = helper.getStudentsInSectionFromResponse(err, res, body);
                var found = false;
                for (var i = 0; i < students.length; i++) {
                    if (students[i].id == 1) {
                        found = true;
                        break;
                    }
                }
                assert.isTrue(found, "Expected to find Student with id 1 in Section 1");
                done();
            });
        });
    });
    var options2 = helper.getAddStudentToSectionOptions(token, 6);
    var url2 = helper.getGetStudentsForSectionURL(1);
    context('Invalid Requests', function() {
        it('Add Student with id 6 to Section 1 (already in section 1)', function(done) {
            request.post(url2, options2, function (err,res,body) {
                //body = JSON.parse(body);
                globalHelper.checkInvalidResponse(err, res, body);
                done();
            });
        });
    });
    var options3 = helper.getAddStudentToSectionOptions(token2, 3);
    var url2 = helper.getGetStudentsForSectionURL(1);
    context('Diabolical Requests', function() {
        it('Add Student with id 4 to Section 1 as Teacher 2 (Teacher 1 owns section 1)', function(done) {
            request.post(url2, options3, function (err,res,body) {
                //body = JSON.parse(body);
                globalHelper.checkInvalidResponse(err, res, body);
                assert.equal(res.statusCode, 403, "Response code should be 403 Forbidden");
                assert.equal(body.message, "You don't have permission to modify this section.", "Server response message");
                done();
            });
        });
    });
}

