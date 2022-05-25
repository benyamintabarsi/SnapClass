const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const sectionModel = require('../../model/Section');
const courseModel = require('../../model/Course');
const auth = require('../authorization');
const roleModel = require('../../model/Role');
const formatter = require('../../ResponseFormatter');

/**
* Parsers for POST data
*/
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

/**
 * Update section data
 */
router.put('/:sectionId', auth.requiredRole([roleModel.enum.TEACHER]), auth.verifyUserOwnsSection(), function(req, res) {
    var id = req.params.sectionId;
    sectionModel.updateSection(id, req.body, function(value) {
        res.status(value.code).json(value.data);
    });
})

module.exports = router;
