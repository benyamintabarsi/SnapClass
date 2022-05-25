var assert = require('chai').assert;
var helper = require("./helper.js");
var globalHelper = require("../../../globalHelper.js");
const request = require('request');
const reqURL = helper.getURL(1);

module.exports.runTests = runTests;

function runTests(token) {
    var options = helper.getAddActiveSectionOptions(token, 1, 2);
    context('Valid Requests', function() {
        it('Update Active Section for teacher with id 1', function(done) {
            request.put(reqURL, options, function (err,res,body) {
                //body = JSON.parse(body);
                globalHelper.checkValidResponse(err, res, body);
                var message = globalHelper.getMessageFromResponse(err, res, body);
                assert.equal(message, "Active section successfully updated!", "Success message should be returned");
                done();
            });
        });
    });
}
