const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const pointsModel = require('../../model/PointsForCategory');
const auth = require('../authorization');
const roleModel = require('../../model/Role');

// Parsers for POST data
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// put points for category
router.put('/:pointId', auth.requiredRole([roleModel.enum.TEACHER]), function(req, res) {
    pointsModel.updatePointsForCategory(req.params.pointId, req.body, function(value) {
        res.status(value.code).json(value.data);
    });
})

module.exports = router;
