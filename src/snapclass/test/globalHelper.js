const BASE_URL = "http://localhost:8866/api/v1";
const assert = require("chai").assert;
const request = require("request");
const LOGIN_URL = BASE_URL + "/users/login";

module.exports = {
  BASE_URL: BASE_URL,
  getLoginToken: getLoginToken,
  getLoginToken2: getLoginToken2,
  checkValidResponse: function (err, res, body) {
    assert.isNull(err, "Error from server response should be empty.");
    assert.exists(res, "Response from server should exist.");
    assert.exists(body, "Body from server response should exist.");

    assert.equal(
      res.statusCode,
      200,
      "Response status code should be 200 (OK). Message: " + body.message
    );
    assert.equal(
      body.success,
      true,
      "Success variable received from server should equal true. Message:" +
        body.message
    );
  },

  checkInvalidResponse: function (err, res, body) {
    assert.isNull(err, "Error from server response should be empty.");
    assert.exists(res, "Response from server should exist.");
    assert.exists(body, "Body from server response should exist.");

    assert.notEqual(
      res.statusCode,
      200,
      "Response status code shouldn't be 200 (OK)."
    );
    assert.equal(
      body.success,
      false,
      "Success variable received from server should be false."
    );
    assert.exists(
      body.code,
      "Error code should have been returned from server."
    );
    assert.exists(
      body.message,
      "Error message should have been returned from server."
    );
  },

  checkInvalidResponseHTML: function (err, res, body) {
    assert.isNull(err, "Error from server response should be empty.");
    assert.exists(res, "Response from server should exist.");
    assert.exists(body, "Body from server response should exist.");

    assert.isString(body, "Server should have returned an html string.");
    assert.equal(
      body.charAt(0),
      "<",
      "Server should have returned an html string."
    );
    assert.isTrue(
      body.includes("html"),
      "Server should have returned an html string."
    );
  },

  getAuthorizationHeader: function (token) {
    return {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    };
  },

  getMessageFromResponse(err, res, body) {
    return body.message;
  },
};

function getLoginToken() {
  var opts = {};
  opts.json = {
    username: "scteacher1",
    pswd: "snapclass",
  };

  return new Promise(function (resolve, reject) {
    request.post(LOGIN_URL, opts, function (err, res, body) {
      if (body.token) {
        teacherLoginToken = body.token;
        resolve(body.token);
      } else {
        reject(err);
      }
    });
  });
}

function getLoginToken2() {
  var opts = {};
  opts.json = {
    username: "scteacher2",
    pswd: "snapclass",
  };

  return new Promise(function (resolve, reject) {
    request.post(LOGIN_URL, opts, function (err, res, body) {
      if (body.token) {
        teacherLoginToken = body.token;
        resolve(body.token);
      } else {
        reject(err);
      }
    });
  });
}
