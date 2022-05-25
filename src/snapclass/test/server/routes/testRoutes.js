// Advice for test format from: 
// https://stackoverflow.com/questions/28229424/how-to-set-execution-order-of-mocha-test-cases-in-multiple-files
server = require("../../../server");
globalHelper = require('../../globalHelper');
var token;
var token2;

// Imports the tests and runs them
function importTest(name, path) {
    describe(name, function () {
        require(path).runTests(token, token2);
    });
}

describe("Test Setup", function () {
    it('Get login tokens', function(done) {
        globalHelper.getLoginToken().then( function (value) {
            token = value;
            module.exports.token = token;
            globalHelper.getLoginToken2().then( function (value) {
                token2 = value;
                module.exports.token2 = token2;
                runTests();
                done();
            }, function(error) {
                console.log("Login token 2 error: " + error);
                done();
            });
        },
        function(error) {
            console.log("Login token 1 error: " + error);
            done();
        });
    });
});

function runTests() {

    describe("API Route Tests", function () {
        beforeEach(function () {
        //console.log("running something before each test");
        });
        //console.log("Inside run");

        // Active Section
        describe("Active Section", function () {
            importTest("Get Active Section", './activeSection/getActiveSection.js');
            importTest("Update Active Section", './activeSection/updateActiveSection.js');
            importTest("Add Active Section", './activeSection/addActiveSection.js');
        });

        // Category
        describe("Category", function () {
            importTest("Get Category", './categories/getCategory.js');
            importTest("Get Categories For Teacher", './categories/getCategoriesForTeacher.js');
            importTest("Get Categories For Rubric", './categories/getCategoriesForRubric.js');

            importTest("Add Category", './categories/addCategory.js');
            importTest("Update Category", './categories/updateCategory.js');
            importTest("Delete Category", './categories/deleteCategory.js');
        });

        // Section
        describe("Section", function () {
            importTest("Get Assignments for Section", './sections/getAssignmentsForSection.js');
            //importTest("Get Past Assignments for Section", './sections/getPastAssignmentsForSection.js');
            importTest("Get Section", './sections/getSection.js');
            importTest("Get Students for Section", './sections/getStudentsForSection.js');
            //importTest("Get Upcoming Assignments for Section", './sections/getUpcomingAssignmentsForSection.js');

            importTest("Add Assignment to Section", './sections/addAssignmentToSection.js');
            importTest("Add Section", './sections/addSection.js');
            importTest("Add Student to Section", './sections/addStudentToSection.js');

            importTest("Update Section", './sections/updateSection.js');

            importTest("Delete Assignment from Section", './sections/deleteAssignmentFromSection.js');
            importTest("Delete Section", './sections/deleteSection.js');
            importTest("Delete Student from Section", './sections/deleteStudentFromSection.js');
        });

        // Assignment
        describe("Assignment", function () {
            importTest("Get Assignment", './assignments/getAssignment.js');
            importTest("Add Assignment", './assignments/addAssignment.js');
            importTest("Update Assignment", './assignments/updateAssignment.js');
            importTest("Delete Assignment", './assignments/deleteAssignment.js');
        });
        // Course
        describe("Course", function () {
            importTest("Get Course", './courses/getCourse.js');
            importTest("Get Courses for Teacher", './courses/getCoursesForTeacher.js');
            importTest("Get Sections for Course", './courses/getSectionsForCourse.js');
            importTest("Add Course", './courses/addCourse.js');
            importTest("Update Course", './courses/updateCourse.js');
            importTest("Delete Course", './courses/deleteCourse.js');
        });
        
        // Points for Category
        describe("Points for Category", function () {
            importTest("Add Points for Category", './pointsForCategory/addPointsForCategory.js');
            importTest("Update Points for Category", './pointsForCategory/updatePointsForCategory.js');
            importTest("Delete Points for Category", './pointsForCategory/deletePointsForCategory.js');
        });

        // Rubric
        describe("Rubric", function () {
            importTest("Get Rubric", './rubrics/getRubric.js');
            importTest("Get Rubrics for Teacher", './rubrics/getRubricsForTeacher.js');

            importTest("Get Template Rubrics", './rubrics/getTemplateRubrics.js');

            importTest("Add Rubric", './rubrics/addRubric.js');

            importTest("Update Rubric", './rubrics/updateRubric.js');

            importTest("Delete Rubric", './rubrics/deleteRubric.js');
        });



        // Teacher
        describe("Teacher", function () {
            importTest("Get Teacher", './teachers/getTeacher.js');

            importTest("Add Teacher", './teachers/addTeacher.js');
            
            importTest("Login Teacher", './teachers/loginTeacher.js');
            importTest("Update Teacher", './teachers/updateTeacher.js');
        });

        after(function () {
            console.log("Shutting down server.");
            server.stop();
        });
    });
}