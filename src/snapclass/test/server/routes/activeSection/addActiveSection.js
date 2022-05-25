var assert = require('chai').assert;
var helper = require("./helper.js");
var globalHelper = require("../../../globalHelper.js");

const request = require('request');
const reqURL = helper.getURL(1);

module.exports.runTests = runTests;

function runTests(token) {
    var options = helper.getAddActiveSectionOptions(token, 1, 1);
    
    context('Valid Requests', function() {
        it('Add Active Section for teacher with id 1', function(done) {
            request.post(reqURL, options, function (err,res,body) {
                //body = JSON.parse(body);
                globalHelper.checkValidResponse(err, res, body);
                var message = globalHelper.getMessageFromResponse(err, res, body);
                assert.equal(message, "Active section successfully added!", "Success message should have been returned.");
                done();
            });
        });
    });
}

