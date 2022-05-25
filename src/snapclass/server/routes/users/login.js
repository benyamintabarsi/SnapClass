const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const userModel = require('../../model/User');
const { Cloud } = require('../../cloud');

const cloud = new Cloud();

// Parsers for POST data
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

/* POST login user account */
router.post('/login', function(req, res) {
  const username = req["body"]["username"];
  const pswd = req["body"]["pswd"];
  cloud.login(
    username,
    pswd,
    true,
    function () {
      console.log(`Cloud login successful for user ${username}`);
      userModel.login(req.body, function(value) {
        res.status(value.code).json(value.data);
      });
    },
    function () {
      // Cloud login failed
      console.log(`Cloud login failed for user ${username}`);
      res.status(400).json({
        message: "Invalid login.",
        success: false
      });
    }
  );
});

module.exports = router;