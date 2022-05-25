const db = require('../routes/db');
const formatter =require('../ResponseFormatter');

/**
 * Get Point for Category by ID
 */
exports.getPointForCategory = function(pointId, callback) {
    db.findByPrimaryKey('points_for_category', pointId, function (err, response) {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
        } 
        else {
            if (response.length == 0) {
                callback(formatter.getInvalidResponse(404, "Point for category not found"));
            }
            else {
                callback(formatter.getValidResponse({point: response}));
            }
        }
    })
}

/**
 * Add point for category
 */
exports.addPointsForCategory = function(data, callback) {
    db.insert('points_for_category', data, function (err, response) {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
        } else  {
            callback(formatter.getEmptyValidResponse("Points for category successfully added!"));
        }
    });
}

/**
 * Delete point for category
 */
exports.deletePointsForCategory = function(pointId, callback) {
    db.delete('points_for_category',{ id:{operator:'=', value: pointId}}, function (err, response) {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
          }
          else callback(formatter.getEmptyValidResponse("Points for category successfully deleted"));
    });
}

/**
 * Update point for category information
 */
exports.updatePointsForCategory = function(pointId, data, callback) {
    db.update('points_for_category', data, {id:{operator:'=', value: pointId}},function (err, response) {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
          }
          else callback(formatter.getEmptyValidResponse("Points for category successfully updated!"));
    })
}