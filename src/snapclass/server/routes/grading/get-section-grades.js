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
 * Get all grades for assignment
 */
router.get('/sections/:sectionID', auth.requiredRole([roleModel.enum.TEACHER]), function(req, res) {
    gradingModel.getSectionGrades(req.params.sectionID, function(value) {
      res.status(value.code).json(value.data);
    })
 })

 module.exports = router;