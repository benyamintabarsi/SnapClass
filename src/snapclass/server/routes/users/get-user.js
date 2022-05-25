const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const userModel = require("../../model/User");

/**
 * Parsers for POST data
 */
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

/**
 * Get user by id
 */
router.get("/:id", function (req, res) {
  userModel.getUser(req.params.id, function (value) {
    if (value.data.user) {
      delete value.data.user.pswd;
    }
    res.status(value.code).json(value.data);
  });
});

module.exports = router;
