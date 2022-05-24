var assert = require('chai').assert;
var helper = require("./helper.js");
var globalHelper = require("../../../globalHelper.js");
const request = require('request');
const reqURL = helper.REQUEST_URL;

module.exports.runTests = runTests;

function runTests(token, token2) {
    var options = {};
    options.headers = globalHelper.getAuthorizationHeader(token);

    context('Valid Requests', function() {
        it('Get all Sections for Course with id 2', function(done) {
            var url = helper.getGetAllSectionsForCourseURL(2);
            request.get(url, options, function (err,res,body) {
                body = JSON.parse(body);
                globalHelper.checkValidResponse(err, res, body);

                var sections = body.sections;
                //console.log(JSON.stringify(sections));
                assert.equal(sections.length, 2, "Course 2 should have 2 sections");

                var section = sections[0];
                assert.equal(section.id, 4, "Section 1 ID");
                assert.equal(section.section_number, "001", "Section 1 Section Number");
                assert.equal(section.course_id, 2, "Section 1 Course ID");
                assert.isNull(section.last_modified, "Section 1 last modified should be null");
                
                section = sections[1];
                assert.equal(section.id, 5, "Section 2 ID");
                assert.equal(section.section_number, "002H", "Section 2 Section Number");
                assert.equal(section.course_id, 2, "Section 2 Course ID");
                assert.isNull(section.last_modified, "Section 2 last modified should be null");
                

                done();
            });
        });
        var options2 = {};
        options2.headers = globalHelper.getAuthorizationHeader(token2);
        it('Get all Sections for Course with id 3', function(done) {
            var url = helper.getGetAllSectionsForCourseURL(3);
            request.get(url, options2, function (err,res,body) {
                console.log(body);
                body = JSON.parse(body);
                globalHelper.checkValidResponse(err, res, body);
                var sections = body.sections;
                assert.equal(sections.length, 0, "Course 3 should have 0 sections");
                assert.equal(res.statusCode, 200, "Response code should be 200 with empty sections array");
                done();
            });
        });
    });
}


