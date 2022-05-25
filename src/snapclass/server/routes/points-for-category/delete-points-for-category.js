const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const pointsModel = require('../../model/PointsForCategory');
const auth = require('../authorization');
const roleModel = require('../../model/Role');

// Parsers for POST data
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// delete points for category
router.delete('/:pointId', auth.requiredRole([roleModel.enum.TEACHER]), function(req, res) {
    pointsModel.deletePointsForCategory(req.params.pointId, function(value) {
        res.status(value.code).json(value.data);
    });
})

module.exports = router;
