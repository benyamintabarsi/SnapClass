const db = require('../routes/db');
const pointsModel = require('./PointsForCategory');
const formatter = require("../ResponseFormatter");

/**
 * Get category and points for category
 */
exports.getCategory = function(id, callback) {
    db.findByPrimaryKey('category', id, function (err, response) {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
        } 
        else {
            if (response.length == 0) {
                callback(formatter.getInvalidResponse(404, "Category not found"));
            }
            else {
                category = response;
                db.query(`SELECT * FROM points_for_category WHERE category_id = ${id}`, function (err, response) {
                    if (err) {
                        callback(formatter.getDatabaseErrorResponse(err));
                    } 
                    else {
                        category.points = response;
                        callback(formatter.getValidResponse({category: category}));
                    }
                });
            }
        }
    });
}

/**
 * Add new category
 */
exports.addCategory = function(data, callback) {
    db.insert('category', data.category, function (err, response) {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
        } else  {
            if (data.category.min_point != null && data.category.max_point != null && data.category.point_scale != null){
                for (i = data.category.min_point; i <= data.category.max_point; i += data.category.point_scale) {
                    pointsData = {
                        points: i,
                        category_id: response.insertId,
                        description: null
                    }
                    pointsModel.addPointsForCategory(pointsData, function(){});
                }
            }            
            if (data.category_for_teacher) {
                data.category_for_teacher.category_id = response.insertId;
                db.insert('category_for_teacher', data.category_for_teacher, function(){});
            }
            if (data.category_for_rubric) {
                data.category_for_rubric.category_id = response.insertId;
                db.insert('category_for_rubric', data.category_for_rubric, function(){});
            }
            callback(formatter.getEmptyValidResponse("Category successfully created!"));
        }
    });
}

/**
 * Update category information
 */
exports.updateCategory = function(categoryId, data, callback) {
    db.update('category', data, {id:{operator:'=', value: categoryId}}, function (err, response) {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
          }
          else callback(formatter.getEmptyValidResponse("Category successfully updated!"));
    });
}

/**
 * Delete category by ID
 */
exports.deleteCategory = function(categoryId, callback) {
    db.delete('category',{ id:{operator:'=', value: categoryId}}, function (err, response) {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
        }
        else if(response.affectedRows == 0) {
            callback(formatter.getInvalidResponse(404, "Category not found, nothing was deleted."));
        }
        else {
            callback(formatter.getEmptyValidResponse("Category successfully deleted!"));
        }
    });
}

/**
 * Get categories for teacher
 */
exports.getTeacherCategories = function(id, callback) {
    db.query(`SELECT category.id, name, learning_objective, min_point, max_point, point_scale FROM category_for_teacher INNER JOIN category ON category.id = category_for_teacher.category_id WHERE user_id = ${id}`, function (err, response) {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
        } 
        else {
            if (response.length == 0) {
                callback(formatter.getInvalidResponse(404, "No categories found"));
            }
            else {
                callback(formatter.getValidResponse({categories: response}));
            }
        }
    });
}