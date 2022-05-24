const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const courseModel = require('../../model/Course');
const auth = require('../authorization');
const roleModel = require('../../model/Role');

// Parsers for POST data
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

/**
 * Update course data
 */
router.put('/:courseId', auth.requiredRole([roleModel.enum.TEACHER]), auth.verifyUserOwnsCourse(), function(req, res) {
    courseModel.updateCourse(req.params.courseId, req.body, function(value) {
        res.status(value.code).json(value.data);
    });
})

module.exports = router;
