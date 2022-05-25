const db = require('../routes/db');
const formatter = require('../ResponseFormatter');

const RoleEnum = {
    TEACHER: 1,
    STUDENT: 2,
    ADMIN: 3,
};

module.exports.enum = RoleEnum;

exports.addUserRole = function(roleId, userId, callback) {
    var userRole = {role_id: roleId.role_id, user_id: userId };
    db.insert('role_for_user', userRole , function(err, response) {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
        } else  {
            callback(formatter.getEmptyValidResponse("Role for user successfully created!"));
        }
    });
}