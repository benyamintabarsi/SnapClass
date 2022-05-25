const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const sectionModel = require('../../model/Section');
const auth = require('../authorization');
const roleModel = require('../../model/Role');

/**
* Parsers for POST data
*/
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

/**
 * POST users in section
 */
router.delete('/:sectionId/students/:userId', auth.requiredRole([roleModel.enum.TEACHER]), auth.verifyUserOwnsSection(), function(req, res) {
    sectionModel.deleteStudentFromSection(req.params.sectionId, req.params.userId, function(value) {
        res.status(value.code).json(value.data);
    });
 });

 module.exports = router;