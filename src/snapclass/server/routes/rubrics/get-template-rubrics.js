const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const rubricModel = require('../../model/Rubric');
const auth = require('../authorization');
const roleModel = require('../../model/Role');

// Parsers for POST data
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

 /**
  * Get template rubrics
  */
 router.get('/templates', auth.requiredRole([roleModel.enum.TEACHER]), function(req, res) {
    rubricModel.getTemplateRubrics(function(value) {
        res.status(value.code).json(value.data);
    });
});

module.exports = router;
