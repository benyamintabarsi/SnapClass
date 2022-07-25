const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const helpModel = require("../../model/Help");

/**
 * Parsers for POST data
 */
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

/**
 * Get help request by user id
 */
router.get("/:id", function (req, res) {
  helpModel.getHelpReq(req.params.id, function (value) {
    res.status(value.code).json(value.data);
  });
});

module.exports = router;
