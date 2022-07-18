const db = require("../routes/db");
const config = require("../routes/config");
const formatter = require("../ResponseFormatter.js");
//const helperModel = require("./HelperRole");

/* Adds help request to the help table in the database. */
exports.addHelpReq = function (data, callback) {
    // if (!data.user || !data.role) {
    //   callback(
    //     formatter.getInvalidResponse(404, "")
    //   );
    //   return;
    // }
    var helpRequest = data.user; // data.user or data.help?
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
          //roleModel.addUserRole(data.role, response.insertId, function () {});
          callback(
            formatter.getEmptyValidResponse("Help Requested!")
          );
        }
      }
    });
  };
  
  /* Update user (NOT including password changes since passwords are stored on cloud) */
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