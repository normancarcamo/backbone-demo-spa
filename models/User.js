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

	    instanceMethods: {
	    	generateToken: function() {
	    		this.sessionToken = crypto.randomBytes(64).toString('hex');
	    	},

	    	resetToken: function(cb) {
				var user = this;
				crypto.randomBytes(64, function (err, buf) {
					user.sessionToken = buf.toString('hex');
					user.save().then(cb);
				});
			},

			setPassword: function(password) {
				var salt = bcrypt.genSaltSync(10);
				this.password = bcrypt.hashSync(password, salt);
			},

			comparePassword: function(password, hash) {
				return bcrypt.compareSync(password, hash);
			},

			login: function(obj) {
				var deferred = Q.defer();
				User.find(obj.data).then(function(user) {
					if (user && user.comparePassword(obj.password, user.password)) {
						deferred.resolve(user);
					} else {
						deferred.reject({ message: obj.error, model: 'user' });
					}
				});
				return deferred.promise;
			},

			checkIfExists: function(obj) {
				var deferred = Q.defer();
				User.find(obj.data).then(function(user) {
					if (user) { deferred.resolve(user); }
					else { deferred.reject({ message: obj.error, model: 'user' }); }
				});
				return deferred.promise;
			},

			checkIfNotExists: function(fields, attributes, error) {
				var deferred = Q.defer();

				User.find({ where: fields, attributes: attributes }).then(function (user) {
					if (user) { deferred.reject({ message: error, model: 'user' }); }
					else { deferred.resolve(); }
				});

				return deferred.promise;
			},

			toString : function(){
				return [
					this.id,
					this.email,
					this.password,
					this.sessionToken,
					this.status
				].join(' ');
			}
		},

		paranoid: true,
		tableName: 'User'
	});

	return User;
};