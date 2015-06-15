'use strict';

var fs = require('fs'),
	path = require('path'),
	env = process.env.NODE_ENV || 'development',
	Sequelize = require('sequelize'),
	config = require('../libs/database/mysql')[env],
	sequelize = new Sequelize(config.database, config.username, config.password, config.options),
	db = {};

fs.readdirSync(__dirname).filter(function(file) {
	return (file.indexOf('.') !== 0) && (file !== 'index.js');
}).forEach(function(file) {
	var model = sequelize['import'](path.join(__dirname, file));
	db[model.name] = model;
});

Object.keys(db).forEach(function(modelName) {
	if ('associate' in db[modelName]) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports.db = db;