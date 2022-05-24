const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const rubricModel = require('../../model/Rubric');
const auth = require('../authorization');
const roleModel = require('../../model/Role');

// Parsers for POST data
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// put rubric
router.put('/:rubricId', auth.requiredRole([roleModel.enum.TEACHER]), auth.verifyUserOwnsRubric(), function(req, res) {
    rubricModel.updateRubric(req.params.rubricId, req.body, function(value) {
        res.status(value.code).json(value.data);
    });
})

module.exports = router;
