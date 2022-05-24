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
 * Update grade by student ID and assignment ID
 */
router.put('/assignments/:assignmentID/students/:studentID', auth.requiredRole([roleModel.enum.TEACHER]), function(req, res) {
    gradingModel.updateGrade(req.params.assignmentID, req.params.studentID, req.body, function(value) {
      res.status(value.code).json(value.data);
    })
 })

 module.exports = router;