const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const userModel = require('../../model/User');

// Parsers for POST data
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

/* POST user create account */
router.post('/', function(req, res) {
    userModel.addUser(req.body, function(value) {
      res.status(value.code).json(value.data);
    });
});

module.exports = router;