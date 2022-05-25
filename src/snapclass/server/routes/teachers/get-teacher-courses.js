const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const courseModel = require('../../model/Course');
const auth = require('../authorization');
const roleModel = require('../../model/Role');

/**
 * Parsers for POST data
 */
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

/**
  * Get Courses for Teacher
  */
 router.get('/:userId/courses', auth.requiredRole([roleModel.enum.TEACHER]), function(req, res) {
    courseModel.getTeacherCourses(req.params.userId, function(value) {
      res.status(value.code).json(value.data);
    });
});

module.exports = router;