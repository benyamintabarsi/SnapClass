const db = require('../routes/db');
const formatter = require('../ResponseFormatter');

const HelperEnum = {
    HAND: 1,
    FIST: 2,
    EXPERT: 3,
};

module.exports.enum = HelperEnum;

// Needed ?
exports.addHelperRole = function(helperId, userId, callback) {
    var helperRole = {helper_id: helperId.helper_id, user_id: userId };
    db.insert('helper_user', helperRole , function(err, response) {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
        } else  {
            callback(formatter.getEmptyValidResponse("Helper role for user successfully created!"));
        }
    });
}