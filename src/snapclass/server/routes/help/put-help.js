const express = require('express');
const auth = require('../authorization');
const db = require('../db');
const router = express.Router();
const bodyParser = require('body-parser');

/**
 * Parsers for POST data
 */
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
const helpModel = require('../../model/Help');

/**
 * Update help request for student with given id
 */
// router.put('/:id', auth.verifyUserIDMatches(), function(req, res) {
  // If request reaches here, then the user they're logged in as
  // and the user they're trying to update were the same.
  //edit: we removed the autorization so that a teacher can modify student helper role information
router.put('/:id', function(req, res) {
  helpModel.updateHelpReq(req.params.id, req.body, function(value) {
    res.status(value.code).json(value.data);
  });
});

module.exports = router;