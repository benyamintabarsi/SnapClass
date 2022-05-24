const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const assignmentsInSectionModel = require('../../model/AssignmentsInSection');
const auth = require('../authorization');
const roleModel = require('../../model/Role');

/**
* Parsers for POST data
*/
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

/**
 * Get assignments for section
 */
router.get('/:sectionId/assignments', auth.requiredRole([roleModel.enum.TEACHER]), function(req, res) {
    assignmentsInSectionModel.getAssignmentsInSection(req.params.sectionId, function(value) {
      res.status(value.code).json(value.data);
    })
 })

 module.exports = router;