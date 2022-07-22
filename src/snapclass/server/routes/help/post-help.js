const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const helpModel = require('../../model/Help');

// Parsers for POST data
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

/* POST help request */
router.post('/', function(req, res) {
    helpModel.addHelpReq(req.body, function(value) {
      res.status(value.code).json(value.data);
    });
});

module.exports = router;