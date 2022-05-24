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
* post add section
*/
router.post('/', auth.requiredRole([roleModel.enum.TEACHER]), function(req, res) {
    sectionModel.addSection(req.body, function(value) {
        res.status(value.code).json(value.data);
    });
})

module.exports = router;