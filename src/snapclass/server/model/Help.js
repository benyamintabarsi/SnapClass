const db = require("../routes/db");
const config = require("../routes/config");
const formatter = require("../ResponseFormatter.js");

/* Adds help request to the help table in the database. */
exports.addHelpReq = function (data, callback) {
    var helpRequest = data;
    db.insert("help", helpRequest, function (err, response) {
      if (err) {
        callback(formatter.getDatabaseErrorResponse(err));
      } else {
        if (response.length == 0) {
          callback(
            formatter.getDefaultInvalidResponse(
              "Help request not posted."
            )
          );
        } else { //sucessful
          callback(
            formatter.getEmptyValidResponse("Help Requested!")
          );
        }
      }
    });
  };
  
  /* Update help request */
  exports.updateHelpReq = function (userId, data, callback) {
    db.update(
      "help",
      data,
      { id: { operator: "=", value: userId } },
      function (err, response) {
        if (err) {
          callback(formatter.getDatabaseErrorResponse(err));
        } else
          callback(
            formatter.getEmptyValidResponse(
              "Help request status was successfully updated!"
            )
          );
      }
    );
  };