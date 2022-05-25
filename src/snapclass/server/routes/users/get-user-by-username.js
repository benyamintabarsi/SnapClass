const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const userModel = require("../../model/User");
const formatter = require("../../ResponseFormatter");

/**
 * Parsers for POST data
 */
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

/**
 * Get user by username
 */
router.get("/:username", function (req, res) {
  userModel.getUserByUsername(req.params.username, function (err, response) {
    if (err) {
      var val = formatter.getInvalidResponse(err.code, err.message);
      res.status(val.code).json(val.data);
    } else {
      if (response.length == 0) {
        var val = formatter.getDefaultInvalidResponse("Username not found");
        res.status(val.code).json(val.data);
      } else {
        var val = formatter.getValidResponse({ user: response[0] });
        if (val.data.user) {
          delete val.data.user.pswd;
        }
        res.status(val.code).json(val.data);
      }
    }
  });
});

module.exports = router;
