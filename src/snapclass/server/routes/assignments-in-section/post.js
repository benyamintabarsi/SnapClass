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
 * POST assignments for section
 */
router.post('/:sectionId/assignments', auth.requiredRole([roleModel.enum.TEACHER]), function(req, res) {
    assignmentsInSectionModel.addAssignmentToSection(req.params.sectionId, req.body.assignment_id, function(value) {
      res.status(value.code).json(value.data);
    })
 })

 module.exports = router;