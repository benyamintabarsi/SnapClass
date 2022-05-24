var assert = require('chai').assert;
var helper = require("./helper.js");
var globalHelper = require("../../../globalHelper.js");
const request = require('request');
const reqURL = helper.getURL(1);

module.exports.runTests = runTests;

function runTests(token) {
    var options = {};
    options.headers = globalHelper.getAuthorizationHeader(token);
    context('Valid Requests', function() {
        it('Get Active Section for teacher with id 1', function(done) {
            request.get(reqURL, options, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkValidResponse(err, res, body);

                var id = helper.getActiveSectionFromResponse(err, res, body);
                assert.equal(id, 1, "Section ID should be 1.");
                done();
            });
        });
    });


    context('Diabolical Requests', function() {
        var options = {};
        it('Get Active Section for teacher with no login token', function(done) {
            request.get(reqURL, options, function (err,res,body) {
                assert.equal(body, "Forbidden", "Server response body");
                done();
            });
        });
    });
}

