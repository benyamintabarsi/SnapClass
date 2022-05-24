const db = require('../routes/db');
const categoryModel = require('./Category');
const formatter = require('../ResponseFormatter');

/**
 * Get rubric information by ID
 */
exports.getRubric = function(id, callback) {
    db.findByPrimaryKey('rubric', id, function (err, response) {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
        } 
        else {
            if (response.length == 0) {
                callback(formatter.getInvalidResponse(404, "Rubric not found"));
            }
            else {
                callback(formatter.getValidResponse({rubric: response}));
            }
        }
    });
}

/**
 * Get categories for rubric
 */
exports.getRubricCategories = function(id, callback) {
    db.query(`SELECT category.id as id, category.name as name, category.learning_objective as learning_objective, category.min_point, category.max_point, category.point_scale, p.points, p.description, p.category_id, p.id as point_id FROM category_for_rubric  INNER JOIN category ON category_for_rubric.category_id = category.id LEFT JOIN points_for_category  as p ON p.category_id = category.id WHERE rubric_id = ${id} ORDER BY p.points`, function (err, response) {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
        } 
        else {
            if (response.length == 0) {
                callback(formatter.getInvalidResponse(404, "Rubric not found"));
            }
            else {
                categories = response;
                for (i = 0; i < categories.length; i++) {
                    if (categories[i]) {
                        var ps = [];
                        p = {
                            point_id: categories[i].point_id,
                            points: categories[i].points,
                            description: categories[i].description,
                            category_id: categories[i].category_id
                        }
                        ps.push(p);
                        delete categories[i].point_id;
                        delete categories[i].points;
                        delete categories[i].description;
                        delete categories[i].category_id;
                        var j = i + 1;
                        while (j < categories.length) {
                            if (categories[j] && categories[i] && categories[j].id == categories[i].id) {
                                p = {
                                    point_id: categories[j].point_id,
                                    points: categories[j].points,
                                    description: categories[j].description,
                                    category_id: categories[j].category_id
                                }
                                ps.push(p);
                                delete categories[j];
                            }
                            j++;
                        }
                        categories[i].points = ps;
                    }
                }
                var filtered = categories.filter(function (el) {
                    return el != null;
                  });
                callback(formatter.getValidResponse({categories: filtered}));
            }
        }
    });
}

/**
 * Add new rubric
 */
exports.addRubric = function(data, callback) {
    if (!data.is_template) {
        if (!data.user_id) {
            callback(formatter.getDefaultInvalidResponse("User ID required"));
            return;
        }
    }
    else {
        data.user_id = null;
    }
    db.insert('rubric', data, function (err, response) {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
        } else  {
            callback(formatter.getEmptyValidResponse("Rubric successfully created!"));
        }
    });
}

/**
 * Update rubric information
 */
exports.updateRubric = function(rubricId, data, callback) {
    db.update('rubric', data, {id:{operator:'=', value: rubricId}},function (err, response) {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
          }
          else callback(formatter.getEmptyValidResponse("Rubric successfully updated!"));
    })
}

/**
 * Delete rubric by ID
 */
exports.deleteRubric = function(rubricId, callback) {
    db.delete('rubric',{ id:{operator:'=', value: rubricId}}, function (err, response) {
        if (err) {
            
            callback(formatter.getDatabaseErrorResponse(err));
        }
        else if (response.affectedRows == 0) {
            callback(formatter.getInvalidResponse(404, "Rubric not found, nothing was deleted."));
        }
        else {
            callback(formatter.getEmptyValidResponse("Rubric successfully deleted"));
        }
    });
}

/**
 * Get all template rubrics
 */
exports.getTemplateRubrics = function(callback) {
    db.query(`SELECT rubric.*, IF(category.name IS NULL, NULL, group_concat(category.name)) as categories FROM rubric LEFT JOIN category_for_rubric ON category_for_rubric.rubric_id = rubric.id LEFT JOIN category on category.id = category_for_rubric.id WHERE is_template = 1 GROUP BY rubric.id`, function (err, response) {
        if (err) {
            callback(formatter.getDatabaseErrorResponse(err));
        } else  {
            if (response.length == 0) {
                callback(formatter.getInvalidResponse(404, "No template rubrics found"));
            }
            else callback(formatter.getValidResponse({rubrics: response}));
        }
    });
}

/**
 * Get rubrics for teacher
 */
exports.getTeacherRubrics = function(id, callback) {
    db.query(`SELECT rubric.*, IF(category.name IS NULL, NULL, group_concat(category.name)) as categories FROM rubric LEFT JOIN category_for_rubric ON category_for_rubric.rubric_id = rubric.id LEFT JOIN category on category.id = category_for_rubric.id WHERE user_id = ${id} GROUP BY rubric.id`, function(err, response) {
        if (err) {
          callback(formatter.getDatabaseErrorResponse(err));
        } else {
          if (response.length == 0) {
            callback(formatter.getInvalidResponse(404, 'No rubrics found'));
          }
          else callback(formatter.getValidResponse({rubrics: response}));
        }
    });
}