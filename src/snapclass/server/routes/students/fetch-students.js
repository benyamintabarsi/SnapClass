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
 * POST get all students by partial username
 */
router.post('/fetchByUsername', auth.requiredRole([roleModel.enum.TEACHER]), function(req, res) {
    studentModel.getStudentsByPartialUserName(req.body.username, function(value) {
        res.status(value.code).json(value.data);
    });
 });

 module.exports = router;