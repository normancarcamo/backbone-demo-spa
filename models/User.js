var bcrypt = require('bcryptjs'),
	crypto = require('crypto'),
	Q = require('q'),
	Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define('user', {

		id: {
			type: DataTypes.INTEGER(10).UNSIGNED, primaryKey: true, allowNull: false, autoIncrement: true,
			get: function() { return this.getDataValue('id'); },
			set: function(id) { this.setDataValue('id', id); },
			validate: {notEmpty: true, isInt: true}
		},

		email: {
			type: DataTypes.STRING(45), allowNull: false, defaultValue: '',
			get: function() { return this.getDataValue('email'); },
			set: function(email) { this.setDataValue('email', email); }
		},

		password: {
			type: DataTypes.STRING, allowNull: false, defaultValue: '',
			get: function() { return this.getDataValue('password'); },
			set: function(password) { this.setDataValue('password', password); }
		},

		role: {
			type: DataTypes.ENUM,
			values: ['Administrator', 'Printer', 'Seller', 'Designer', 'Normal'], defaultValue: 'Normal',
			allowNull: false,
			get: function() { return this.getDataValue('role'); },
			set: function(role) { this.setDataValue('role', role); }
		},

		sessionToken: { type: DataTypes.STRING, defaultValue: '' },

		status: {
			type: DataTypes.ENUM, values: ['active', 'inactive'], allowNull: false, defaultValue: 'inactive',
			get: function() { return this.getDataValue('status'); },
			set: function(status) { this.setDataValue('status', status); }
		}
	}, {
		classMethods: {
			associate: function(models) {
				User.belongsTo(models.employee);
			}
	    },
		paranoid: true,
		tableName: 'User'
	});

	return User;
};
