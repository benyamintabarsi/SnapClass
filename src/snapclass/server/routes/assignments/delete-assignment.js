const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const assignmentModel = require('../../model/Assignment');
const auth = require('../authorization');
const roleModel = require('../../model/Role');

/**
* Parsers for POST data
*/
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

/**
 * Delete assignment by assignment ID
 */
router.delete('/delete/:assignmentId', auth.requiredRole([roleModel.enum.TEACHER]), function(req, res) {
    assignmentModel.deleteAssignment(req.params.assignmentId, function(value) {
      res.status(value.code).json(value.data);
    })
 })

 module.exports = router;
