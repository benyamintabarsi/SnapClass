const db = require("../routes/db");
const roleModel = require("./Role");
const config = require("../routes/config");
const jwt = require("jsonwebtoken");
const formatter = require("../ResponseFormatter.js");

/**
 * Get user information by id
 */
exports.getUser = function (id, callback) {
  db.findByPrimaryKey("user", id, function (err, response) {
    if (err) {
      callback(formatter.getDatabaseErrorResponse(err));
    } else {
      if (response.length == 0) {
        callback(formatter.getInvalidResponse(404, "User id not found"));
      } else callback(formatter.getValidResponse({ user: response }));
    }
  });
};

exports.addUser = function (data, callback) {
  if (!data.user || !data.role) {
    callback(
      formatter.getInvalidResponse(404, "User account not successfully created")
    );
    return;
  }
  var user = data.user;
  db.insert("user", user, function (err, response) {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        callback(formatter.getDefaultInvalidResponse("Username already exists in SnapClass"));
      } else {
        callback(formatter.getDatabaseErrorResponse(err));
      }
    } else {
      if (response.length == 0) {
        callback(
          formatter.getDefaultInvalidResponse(
            "User account not successfully created"
          )
        );
      } else {
        roleModel.addUserRole(data.role, response.insertId, function () {});
        callback(
          formatter.getEmptyValidResponse("Account successfully created!")
        );
      }
    }
  });
};

/* Update user (NOT including password changes since passwords are stored on cloud) */
exports.updateUser = function (userId, data, callback) {
  db.update(
    "user",
    data,
    { id: { operator: "=", value: userId } },
    function (err, response) {
      if (err) {
        callback(formatter.getDatabaseErrorResponse(err));
      } else
        callback(
          formatter.getEmptyValidResponse(
            "Your account was successfully updated!"
          )
        );
    }
  );
};

/* Get user by unique identifier */
exports.getUserByUsername = function (username, callback) {
  db.query(
    `SELECT user.*, section_id as activeSection, role_id FROM user LEFT JOIN active_section ON user.id = active_section.user_id INNER JOIN role_for_user ON user.id = role_for_user.user_id WHERE username = "${username}"`,
    function (err, response) {
      callback(err, response);
    }
  );
};

exports.login = function (data, callback) {
  if (!data.username) {
    callback(formatter.getDefaultInvalidResponse("Missing information"));
    return;
  }
  var username = data.username;

  exports.getUserByUsername(username, (err, user) => {
    if (err) {
      callback(formatter.getInvalidResponse(err.code, err.message));
      return;
    }
    if (!user || user.length == 0) {
      callback(formatter.getDefaultInvalidResponse("Username not found"));
      return;
    }

    const token = jwt.sign(
      { data: user, permissions: user[0].role_id },
      config.secret,
      {
        expiresIn: 604800, // 1 week
      }
    );
    delete user[0].pswd;
    delete user[0].user_id;
    callback(
      formatter.getValidResponse({ token: "JWT " + token, user: user[0] })
    );

    // Removed since authentication is done by Berkeley cloud now.

    // bcrypt.compare(password, user[0].pswd, (err, isMatch) => {
    //   if (err) throw err;
    //   if (isMatch) {
    //     const token = jwt.sign(
    //       { data: user, permissions: user[0].role_id },
    //       config.secret,
    //       {
    //         expiresIn: 604800, // 1 week
    //       }
    //     );
    //     delete user[0].pswd;
    //     delete user[0].user_id;
    //     callback(
    //       formatter.getValidResponse({ token: "JWT " + token, user: user[0] })
    //     );
    //   } else {
    //     callback(formatter.getDefaultInvalidResponse("Incorrect password"));
    //   }
    // });
  });
};
