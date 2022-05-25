const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const gradingModel = require('../../model/Grading');
const auth = require('../authorization');
const roleModel = require('../../model/Role');

/**
* Parsers for POST data
*/
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

/**
 * Get grade by student ID and assignment ID
 */
router.get('/assignments/:assignmentID/students/:studentID', auth.requiredRole([roleModel.enum.TEACHER]), function(req, res) {
    gradingModel.getGrade(req.params.assignmentID, req.params.studentID, function(data) {
      res.json(data);
    })
 })

 module.exports = router;