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
 * Get assignment by id
 */
router.get('/:userId', auth.requiredRole([roleModel.enum.STUDENT, roleModel.enum.TEACHER]), function(req, res) {
    sectionModel.getAllForTeacher(req.params.userId, function(value) {
        res.status(value.code).json(value.data);
    });
})

module.exports = router;
