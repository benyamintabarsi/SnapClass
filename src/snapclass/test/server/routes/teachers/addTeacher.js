var server = require("../../../../server.js");
var assert = require('chai').assert;
var helper = require("./helper.js");
var globalHelper = require("../../../globalHelper.js");
// This require automatically launches the server
const request = require('request');
const reqURL = helper.REQUEST_URL;

var options = helper.getTeacherAddOptions("testTeacher", "Ms.Test", "julytest@email.com");
var options2 = helper.getTeacherAddOptions("testTeacher2", "Mr.Testo", "bobtesto@email.com");

module.exports.runTests = runTests;

function runTests(token) {

    context('Valid Requests', function() {
        it('Add teacher with name testTeacher', function(done) {
            request.post(reqURL, options, function (err,res,body) {
                globalHelper.checkValidResponse(err, res, body);
                done();
            });
        });
        it('Confirm testTeacher was added (relies on GET Teacher)', function(done) {
            request.get(reqURL +"/9", function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkValidResponse(err, res, body);

                var user = helper.getTeacherInfoFromResponse(err, res, body);
                assert.equal(user.username, "julytest@email.com");
                assert.equal(user.name, "testTeacher");
                assert.equal(user.preferred_name, "Ms.Test");
                done();
            });
        });
    });

    context('Invalid Requests', function() {
        it('Try to add testTeacher when they already exist', function(done) {
            request.post(reqURL, options, function (err,res,body) {
                globalHelper.checkInvalidResponse(err, res, body);
                done();
            });
        });

        it('Try to add teacher with no user data', function(done) {
            helper.setTeacherOptionValue(options2, "user", null);
            request.post(reqURL, options2, function (err,res,body) {
                globalHelper.checkInvalidResponse(err, res, body);
                done();
            });
        });
    });

    // Post-test cleanup
    after(async function () {
        //server.stop();
    });
}
