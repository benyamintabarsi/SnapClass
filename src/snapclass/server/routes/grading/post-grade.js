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
 * Add grade by student ID and assignment ID
 */
router.post('/', auth.requiredRole([roleModel.enum.TEACHER]), function(req, res) {
    gradingModel.addGrade(req.body, function(value) {
      res.status(value.code).json(value.data);
    })
 })

 module.exports = router;