var server = require("../../../../server.js");
var assert = require('chai').assert;
var helper = require("./helper.js");
var globalHelper = require("../../../globalHelper.js");
const request = require('request');
const reqURL = helper.REQUEST_URL;

module.exports.runTests = runTests;

function runTests(token, token2) {
    var options = {};
    options.headers = globalHelper.getAuthorizationHeader(token);
    var url = helper.getDeleteStudentFromSectionURL(1, 6);
    context('Valid Requests', function() {
        it('Delete Student with id 6 from Section 1', function(done) {
            request.delete(url, options, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkValidResponse(err, res, body);
                done();
            });
        });
        it('Confirm Student 6 is no longer in Section 1', function(done) {
            var getOptions = {};
            getOptions.headers = globalHelper.getAuthorizationHeader(token);
            var getURL = helper.getGetStudentsForSectionURL(1);
            request.get(getURL, getOptions, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkValidResponse(err, res, body);
                var students = helper.getStudentsInSectionFromResponse(err, res, body);
                //console.log("Students: " + JSON.stringify(students));
                assert.equal(students.length, 2, "2 Students should be in Section 1");
                var found = false;
                for (var i = 0; i < students.length; i++) {
                    if (students[i].id == 6) {
                        found = true;
                    }
                }
                assert.isFalse(found, "Should not have found Student 6 in Section 1");
                done();
            });
        });
    });

    var options2 = {};
    options2.headers = globalHelper.getAuthorizationHeader(token2);
    var url = helper.getDeleteStudentFromSectionURL(1, 2);
    context('Diabolical Requests', function() {
        it('Delete Student with id 2 from Section 1 as Teacher 2 (belongs to Teacher 1)', function(done) {
            request.delete(url, options, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkValidResponse(err, res, body);
                done();
            });
        });
    });
}

