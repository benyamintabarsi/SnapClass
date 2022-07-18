const express = require("express");
const app = express();

//
// LOGS
//
const postLog = require("./logs/post-log");
app.use("/api/v1/logs", postLog);

//-----------------------------------------
// USERS
//-----------------------------------------

/**
 * Add GET user by id route to server
 */
const getUser = require("./users/get-user");
app.use("/api/v1/users", getUser);

/**
 * Add GET user by username route to server
 */
const getUserByUsername = require("./users/get-user-by-username");
app.use("/api/v1/users/username", getUserByUsername);

/**
 * Add POST user route to server
 */
const addUser = require("./users/post-user");
app.use("/api/v1/users", addUser);

/**
 * Add PUT user route to server
 */
const editUser = require("./users/put-user");
app.use("/api/v1/users", editUser);

/**
 * Add login route to server
 */
const login = require("./users/login");
app.use("/api/v1/users", login);

/**
 * Add logout route to server
 */
//const logout = require('./users/logout');
//app.use("/api/v1/students", logout);

//-----------------------------------------
// STUDENTS
//-----------------------------------------

/**
 * Add POST helper route to server
 */
 const addHelp = require("./help/post-help");
 app.use("/api/v1/help", addHelp);
 
 /**
  * Add PUT helper route to server
  */
 const editHelp = require("./help/put-help");
 app.use("/api/v1/help", editHelp);

/**
 * Add GET students by partial username route to server
 */
const fetchStudents = require("./students/fetch-students");
app.use("/api/v1/students", fetchStudents);

/**
 * Add GET all courses for student
 */
const getStudentCourses = require("./students/get-courses");
app.use("/api/v1/students", getStudentCourses);

/**
 * Add GET course for student
 */
const getStudentCourse = require("./students/get-course");
app.use("/api/v1/students", getStudentCourse);

/**
 * Add GET all upcoming assignments for student
 */
const getUpcomingAssignments = require("./students/get-upcoming-assignments");
app.use("/api/v1/students", getUpcomingAssignments);

/**
 * Add GET all past assignments for student
 */
const getPastAssignments = require("./students/get-past-assignments");
app.use("/api/v1/students", getPastAssignments);

//-----------------------------------------
// TEACHERS
//-----------------------------------------

/**
 * Add GET teacher courses route to server
 */
const teacherCourses = require("./teachers/get-teacher-courses");
app.use("/api/v1/teachers", teacherCourses);

/**
 * Add GET rubrics for teacher route to server
 */
const getTeacherRubrics = require("./teachers/get-teacher-rubrics");
app.use("/api/v1/teachers", getTeacherRubrics);

/**
 * Add GET categories for teacher route to server
 */
const getTeacherCategories = require("./teachers/get-teacher-categories");
app.use("/api/v1/teachers", getTeacherCategories);

//-----------------------------------------
// COURSES
//-----------------------------------------

/**
 * Add GET course route to server
 */
const getCourse = require("./courses/get-course");
app.use("/api/v1/courses", getCourse);

/**
 * Add POST course route to server
 */
const addCourse = require("./courses/post-course");
app.use("/api/v1/courses", addCourse);

/**
 * Add PUT course route to server
 */
const editCourse = require("./courses/put-course");
app.use("/api/v1/courses", editCourse);

/**
 * Add DELETE course route to server
 */
const deleteCourse = require("./courses/delete-course");
app.use("/api/v1/courses", deleteCourse);

/**
 * Add GET course sections route to server
 */
const courseSections = require("./courses/get-course-sections");
app.use("/api/v1/courses", courseSections);

//-----------------------------------------
// SECTIONS
//-----------------------------------------

/**
 * Add GET section route to server
 */
const getSection = require("./sections/get-section");
app.use("/api/v1/sections", getSection);

/**
 * Add POST section route to server
 */
const addSection = require("./sections/post-section");
app.use("/api/v1/sections", addSection);

/**
 * Add PUT section route to server
 */
const editSection = require("./sections/put-section");
app.use("/api/v1/sections", editSection);

/**
 * Add DELETE section route to server
 */
const deleteSection = require("./sections/delete-section");
app.use("/api/v1/sections", deleteSection);

/**
 * Add GET all students for section route to server
 */
const getStudentsForSection = require("./sections/get-students");
app.use("/api/v1/sections", getStudentsForSection);

/**
 * Add POST student to section route to server
 */
const addStudentToSection = require("./sections/post-student");
app.use("/api/v1/sections", addStudentToSection);

/**
 * Add DELETE student to section route to server
 */
const removeStudentFromSection = require("./sections/delete-student");
app.use("/api/v1/sections", removeStudentFromSection);

/**
 * Add GET courses and sections to teacher to server
 */
const getAllForTeacher = require("./sections/get-all");
app.use("/api/v1/sections/all", getAllForTeacher);

//-----------------------------------------
// ASSIGNMENTS
//-----------------------------------------

/**
 * Add GET assignment route to server
 */
const getAssignment = require("./assignments/get-assignment");
app.use("/api/v1/assignments", getAssignment);

/**
 * Add POST assignment route to server
 */
const addAssignment = require("./assignments/post-assignment");
app.use("/api/v1/assignments", addAssignment);

/**
 * Add PUT assignment route to server
 */
const editAssignment = require("./assignments/put-assignment");
app.use("/api/v1/assignments", editAssignment);

/**
 * Add DELETE assignment route to server
 */
const deleteAssignment = require("./assignments/delete-assignment");
app.use("/api/v1/assignments", deleteAssignment);

/**
 * Getting assignment ID from section ID
 */
const getSectionByAssignment = require("./assignments/get-assignment-by-section");
app.use("/api/v1/sections/a2s", getSectionByAssignment);

//-----------------------------------------
// ASSIGNMENTS IN SECTION
//-----------------------------------------

/**
 * Add GET assignments for section route to server
 */
const getSectionAssignments = require("./assignments-in-section/get");
app.use("/api/v1/sections", getSectionAssignments);

/**
 * Add POST assignments for section route to server
 */
const postSectionAssignments = require("./assignments-in-section/post");
app.use("/api/v1/sections", postSectionAssignments);

/**
 * Add DELETE assignments for section route to server
 */
const deleteSectionAssignments = require("./assignments-in-section/delete");
app.use("/api/v1/sections", deleteSectionAssignments);

//-----------------------------------------
// ACTIVE SECTION
//-----------------------------------------

/**
 * Add GET active section route to server
 */
const getActiveSection = require("./active-section/get");
app.use("/api/v1/teachers", getActiveSection);

/**
 * Add POST active section route to server
 */
const postActiveSection = require("./active-section/post");
app.use("/api/v1/teachers", postActiveSection);

/**
 * Add PUT active section route to server
 */
const putActiveSection = require("./active-section/put");
app.use("/api/v1/teachers", putActiveSection);

//-----------------------------------------
// RUBRIC
//-----------------------------------------

/**
 * Add GET template rubrics route to server
 */
const getTemplateRubrics = require("./rubrics/get-template-rubrics");
app.use("/api/v1/rubrics", getTemplateRubrics);

/**
 * Add GET rubric route to server
 */
const getRubric = require("./rubrics/get-rubric");
app.use("/api/v1/rubrics", getRubric);

/**
 * Add POST rubric route to server
 */
const addRubric = require("./rubrics/post-rubric");
app.use("/api/v1/rubrics", addRubric);

/**
 * Add PUT rubric route to server
 */
const editRubric = require("./rubrics/put-rubric");
app.use("/api/v1/rubrics", editRubric);

/**
 * Add DELETE rubric route to server
 */
const deleteRubric = require("./rubrics/delete-rubric");
app.use("/api/v1/rubrics", deleteRubric);

/**
 * Add GET rubric categories route to server
 */
const getRubricCategories = require("./rubrics/get-rubric-categories");
app.use("/api/v1/rubrics", getRubricCategories);

//-----------------------------------------
// POINTS
//-----------------------------------------

/**
 * Add GET points for category route to server
 */
const getPointsForCategory = require("./points-for-category/get-points-for-category");
app.use("/api/v1/points", getPointsForCategory);

/**
 * Add POST points for category route to server
 */
const addPointsForCategory = require("./points-for-category/post-points-for-category");
app.use("/api/v1/points", addPointsForCategory);

/**
 * Add PUT points for category route to server
 */
const editPointsForCategory = require("./points-for-category/put-points-for-category");
app.use("/api/v1/points", editPointsForCategory);

/**
 * Add DELETE points for category route to server
 */
const deletePointsForCategory = require("./points-for-category/delete-points-for-category");
app.use("/api/v1/points", deletePointsForCategory);

//-----------------------------------------
// CATEGORIES
//-----------------------------------------

/**
 * Add GET category route to server
 */
const getCategory = require("./categories/get-category");
app.use("/api/v1/categories", getCategory);

/**
 * Add POST category route to server
 */
const addCategory = require("./categories/post-category");
app.use("/api/v1/categories", addCategory);

/**
 * Add PUT category route to server
 */
const editCategory = require("./categories/put-category");
app.use("/api/v1/categories", editCategory);

/**
 * Add DELETE category route to server
 */
const deleteCategory = require("./categories/delete-category");
app.use("/api/v1/categories", deleteCategory);

//-----------------------------------------
// SUBMISSIONS
//-----------------------------------------

/**
 * Add GET submission route to server
 */
const getSubmission = require("./submissions/get-submission");
app.use("/api/v1/submissions", getSubmission);

/**
 * Add PUT submission route to server
 */
const editSubmission = require("./submissions/put-submission");
app.use("/api/v1/submissions", editSubmission);

/**
 * Add POST submission route to server
 */
const addSubmission = require("./submissions/post-submission");
app.use("/api/v1/submissions", addSubmission);

//-----------------------------------------
// GRADING
//-----------------------------------------

/**
 * Add GET grade route to server
 */
const getGrade = require("./grading/get-grade");
app.use("/api/v1/grading", getGrade);

/**
 * Add PUT grade route to server
 */
const updateGrade = require("./grading/put-grade");
app.use("/api/v1/grading", updateGrade);

/**
 * Add POST grade route to server
 */
const addGrade = require("./grading/post-grade");
app.use("/api/v1/grading", addGrade);

/**
 * Add GET grades for assignment route to server
 */
const getAssignmentGrades = require("./grading/get-assignment-grades");
app.use("/api/v1/grading", getAssignmentGrades);

/**
 * Add GET grades for section route to server
 */
const getSectionGrades = require("./grading/get-section-grades");
app.use("/api/v1/grading", getSectionGrades);

module.exports = app;
