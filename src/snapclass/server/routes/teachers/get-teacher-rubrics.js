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
  * Get rubrics for teacher
  */
 router.get('/:userId/rubrics', auth.requiredRole([roleModel.enum.TEACHER]), function(req, res) {
    rubricModel.getTeacherRubrics(req.params.userId, function(value) {
        res.status(value.code).json(value.data);
    });
});

module.exports = router;
