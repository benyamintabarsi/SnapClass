var server = require("../../../../server.js");
var assert = require('chai').assert;
var helper = require("./helper.js");
var globalHelper = require("../../../globalHelper.js");
// This require automatically launches the server
const request = require('request');
const reqURL = helper.REQUEST_URL;

module.exports.runTests = runTests;

function runTests(token, token2) {
    var options = {};
    options.headers = globalHelper.getAuthorizationHeader(token);
    var getOptions = {};
    getOptions.headers = globalHelper.getAuthorizationHeader(token);
    context('Valid Requests', function() {
        it('Delete Section with id 3', function(done) {
            request.delete(reqURL + "/3", options, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkValidResponse(err, res, body);
                done();
            });
        });
        it('Confirm Section 3 was deleted (Relies on GET Section)', function(done) {
            request.get(reqURL + "/3", getOptions, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkInvalidResponse(err, res, body);
                done();
            });
        });
    });
    var options2 = {};
    options2.headers = globalHelper.getAuthorizationHeader(token2);
    context('Diabolical Requests', function() {
        it('Delete Section with id 2 as Teacher 2 (Teacher 1 owns Section 2)', function(done) {
            request.delete(reqURL + "/2", options2, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkInvalidResponse(err, res, body);
                assert.equal(res.statusCode, 403, "Response status code");
                done();
            });
        });
    });
}

