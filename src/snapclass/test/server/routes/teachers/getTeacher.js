var server = require("../../../../server.js");
var assert = require('chai').assert;
var helper = require("./helper.js");
var globalHelper = require("../../../globalHelper.js");
// This require automatically launches the server
const request = require('request');
const reqURL = helper.REQUEST_URL;

module.exports = {
    runTests: function(token) {
            context('Valid Requests', function() {
            it('Get teacher with id 1', function(done) {
                request.get(reqURL +"/1", function (err,res,body) {
                    body = JSON.parse(body);
                    globalHelper.checkValidResponse(err, res, body);

                    var user = helper.getTeacherInfoFromResponse(err, res, body);
                    assert.equal(user.username, "scteacher1");
                    assert.equal(user.name, "teacher1");
                    assert.equal(user.preferred_name, "teacher1");
                    assert.isUndefined(user.pswd, "Should not have retrieved user password.");
                    done();
                });
            });
        });

        context('Invalid Requests', function() {
            it('Get teacher with id -1', function(done) {
                request.get(reqURL +"/-1", function (err,res,body) {
                    body = JSON.parse(body);
                    globalHelper.checkInvalidResponse(err, res, body);
                    done();
                });
            });

            it('Get teacher with no id', function(done) {
                request.get(reqURL +"/", function (err,res,body) {
                    //body = JSON.parse(body);
                    globalHelper.checkInvalidResponseHTML(err, res, body);
                    done();
                });
            });

            it('Get teacher with id too high (10,000)', function(done) {
                request.get(reqURL +"/10000", function (err,res,body) {
                    body = JSON.parse(body);
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
}
