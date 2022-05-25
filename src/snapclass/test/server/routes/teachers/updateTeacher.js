/**
 * These tests may need to be fixed after berkely login change
 */
var server = require("../../../../server.js");
var assert = require('chai').assert;
var helper = require("./helper.js");
var globalHelper = require("../../../globalHelper.js");
// This require automatically launches the server
const request = require('request');
const reqURL = helper.REQUEST_URL;
var newPassword = "12345";

module.exports.runTests = runTests;


function runTests(token, token2) {

    context('Valid Requests', function(done) {
        // TODO: add a test that uses a get request to verify user was updated
        var options = helper.getTeacher1UpdateInfoOptions(token, "newUsername@test.com", "UpdatedName", "UpdatedPrefName");
        it('Update teacher1\'s account infomation', function(done) {
            request.put(reqURL + "/1", options, function (err,res,body) {
                globalHelper.checkValidResponse(err, res, body);
                done();
            });

        });
        it('Confirm teacher1 was updated (relies on GET Teacher)', function(done) {
            request.get(reqURL +"/1", function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkValidResponse(err, res, body);

                var user = helper.getTeacherInfoFromResponse(err, res, body);
                assert.equal(user.username, "newUsername@test.com");
                assert.equal(user.name, "UpdatedName");
                assert.equal(user.preferred_name, "UpdatedPrefName");
                assert.isUndefined(user.pswd, "Should not have retrieved user password.");
                done();
            });
        });
    });
    context('Invalid Requests', function(done) {
        var options = helper.getTeacher1UpdatePasswordOptions(token, newPassword, newPassword, "badConfirmation");
        it('Try to update teacher1\'s password with unmatching confirmation new password', function(done) {
            request.put(reqURL + "/1", options, function (err,res,body) {
                globalHelper.checkInvalidResponse(err, res, body);
                done();
            });

        });
    });
}
