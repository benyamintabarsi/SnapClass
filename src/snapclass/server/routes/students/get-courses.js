const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const studentModel = require('../../model/Student');
const auth = require('../authorization');
const roleModel = require('../../model/Role');

/**
* Parsers for POST data
*/
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

/**
 * GET all courses for student
 */
router.get('/:id/courses', auth.requiredRole([roleModel.enum.STUDENT]), function(req, res) {
    studentModel.getCourses(req.params.id, function(value) {
        res.status(value.code).json(value.data);
    });
 });

 module.exports = router;