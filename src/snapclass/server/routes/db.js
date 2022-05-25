const config = require('./config');

// Initialization database connection
var MysqlJson = require('mysql-json');
var mysqlJson = new MysqlJson({
    host:	  config.database.host,
	user: 	  config.database.user,
	password: config.database.password,
	database: config.database.db
});

module.exports = mysqlJson;