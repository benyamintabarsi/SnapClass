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
 * Get section by section ID
 */
router.get('/:sectionId', auth.requiredRole([roleModel.enum.TEACHER]), auth.verifyUserOwnsSection(), function(req, res) {
    sectionModel.getSection(req.params.sectionId, function(value) {
      res.status(value.code).json(value.data);
    })
 })

 module.exports = router;