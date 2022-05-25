var assert = require('chai').assert;
var helper = require("./helper.js");
var globalHelper = require("../../../globalHelper.js");
const request = require('request');
const reqURL = helper.REQUEST_URL;

module.exports.runTests = runTests;


function runTests(token, token2) {
    var getOptions = {};
getOptions.headers = globalHelper.getAuthorizationHeader(token);
    var options = helper.getSectionAddOptions(token, 1, "555");

    context('Valid Requests', function() {
        it('Update Section with ID 1', function(done) {
            request.put(reqURL + "/1", options, function (err,res,body) {
                //body = JSON.parse(body);
                globalHelper.checkValidResponse(err, res, body);
                done();
            });
        });
        it('Confirm Section 1 was updated (relies on GET Section)', function(done) {
            request.get(reqURL + "/1", getOptions, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkValidResponse(err, res, body);
                var section = helper.getSectionFromResponse(err, res, body);
                assert.equal(section.section_number, "555", "Section number");
                assert.equal(section.course_id, 1, "Section's Course ID");
                done();
            });
        });
    });

    context('Invalid Requests', function() {
        var options3 = helper.getSectionAddOptions(token, 1, "444");
        it('Update Section with ID 1000 as Teacher 1 (Does not exist)', function(done) {
            request.put(reqURL + "/1000", options3, function (err,res,body) {
                globalHelper.checkInvalidResponse(err, res, body);
                assert.equal(res.statusCode, 404, "Response code should have been 404 Not Found");
                assert.equal(body.message, "Section not found");
                done();
            });
        });
    });

    context('Diabolical Requests', function() {
        var options2 = helper.getSectionAddOptions(token2, 1, "444");
        it('Update Section with ID 1 as Teacher 2 (Belongs to Teacher 1)', function(done) {
            request.put(reqURL + "/1", options2, function (err,res,body) {
                //body = JSON.parse(body);
                globalHelper.checkInvalidResponse(err, res, body);
                done();
            });
        });
        it('Confirm Section 1 was not updated (relies on GET Section)', function(done) {
            request.get(reqURL + "/1", getOptions, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkValidResponse(err, res, body);
                var section = helper.getSectionFromResponse(err, res, body);
                assert.notEqual(section.section_number, "444", "Section number should not have been updated");
                done();
            });
        });
    });
}

