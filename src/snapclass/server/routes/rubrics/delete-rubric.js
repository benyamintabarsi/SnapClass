const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const rubricModel = require('../../model/Rubric');
const auth = require('../authorization');
const roleModel = require('../../model/Role');

// Parsers for POST data
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// delete rubric
router.delete('/:rubricId', auth.requiredRole([roleModel.enum.TEACHER]), auth.verifyUserOwnsRubric(), function(req, res) {
    rubricModel.deleteRubric(req.params.rubricId, function(value) {
        res.status(value.code).json(value.data);
    });
})

module.exports = router;
