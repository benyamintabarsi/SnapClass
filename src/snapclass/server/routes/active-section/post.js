const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const activeSectionModel = require('../../model/ActiveSection');
const auth = require('../authorization');
const roleModel = require('../../model/Role');

/**
* Parsers for POST data
*/
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

/**
 * POST last active section for teacher
 */
router.post('/:userId/active/section', auth.requiredRole([roleModel.enum.TEACHER]), function(req, res) {
    activeSectionModel.addActiveSection(req.body.section_id, req.params.userId, function(value) {
      res.status(value.code).json(value.data);
    })
 })

 module.exports = router;