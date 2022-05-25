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
  * Get rubric categories by ID
  */
 router.get('/:rubricId/categories', auth.requiredRole([roleModel.enum.TEACHER]), function(req, res) {
    rubricModel.getRubricCategories(req.params.rubricId, function(value) {
        res.status(value.code).json(value.data);
    });
});

module.exports = router;
