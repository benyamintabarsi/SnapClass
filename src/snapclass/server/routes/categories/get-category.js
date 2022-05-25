const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const categoryModel = require('../../model/Category');
const auth = require('../authorization');
const roleModel = require('../../model/Role');

// Parsers for POST data
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

 /**
  * Get category by ID
  */
 router.get('/:categoryId', auth.requiredRole([roleModel.enum.TEACHER]), function(req, res) {
    categoryModel.getCategory(req.params.categoryId, function(value) {
        res.status(value.code).json(value.data);
    });
});

module.exports = router;
