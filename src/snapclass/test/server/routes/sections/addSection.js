var server = require("../../../../server.js");
var assert = require('chai').assert;
var helper = require("./helper.js");
var globalHelper = require("../../../globalHelper.js");
// This require automatically launches the server
const request = require('request');
const reqURL = helper.REQUEST_URL;


module.exports.runTests = runTests;
function runTests(token) {
    var options = helper.getSectionAddOptions(token, 1, "444");
    var getOptions = {};
    getOptions.headers = globalHelper.getAuthorizationHeader(token);
    context('Valid Requests', function() {
        it('Add Section to Course 1', function(done) {
            request.post(reqURL, options, function (err,res,body) {
                //body = JSON.parse(body);
                globalHelper.checkValidResponse(err, res, body);
                done();
            });
        });
        it('Confirm Section was added (Relies on GET Section)', function(done) {
            request.get(reqURL + "/6", getOptions, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkValidResponse(err, res, body);
                var section = helper.getSectionFromResponse(err, res, body);
                assert.equal(section.section_number, "444", "Section number");
                assert.equal(section.course_id, 1, "Section's Course ID");
                done();
            });
        });
    });
    
}

