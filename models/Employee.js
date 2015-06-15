var Q = require('q');

module.exports = function(sequelize, DataTypes) {

	var Employee = sequelize.define('employee', {

		id: {
			type: DataTypes.INTEGER(10).UNSIGNED, primaryKey: true, allowNull: false, autoIncrement: true,
			get: function() { return this.getDataValue('id'); },
			set: function(id) { this.setDataValue('id', id); },
			validate: {notEmpty: true, isInt: true}
		},

		firstname: {
			type: DataTypes.STRING(60), allowNull: false, defaultValue: '',
			get: function() { return this.getDataValue('firstname'); },
			set: function(firstname) { this.setDataValue('firstname', firstname); }
		},

		lastname: {
			type: DataTypes.STRING(60), allowNull: false, defaultValue: '',
			get: function() { return this.getDataValue('lastname'); },
			set: function(lastname) { this.setDataValue('lastname', lastname); }
		},

		gender: {
			type: DataTypes.ENUM, values: ['Male', 'Female'], allowNull: false, defaultValue: 'Male',
			get: function() { return this.getDataValue('gender'); },
			set: function(gender) { this.setDataValue('gender', gender); }
		},

		rtn: {
			type: DataTypes.STRING(20), allowNull: false, defaultValue: '',
			get: function() { return this.getDataValue('rtn'); },
			set: function(rtn) { this.setDataValue('rtn', rtn); }
		},

		location: {
			type: DataTypes.STRING(100), allowNull: false, defaultValue: '',
			get: function() { return this.getDataValue('location'); },
			set: function(location) { this.setDataValue('location', location); }
		},

		phone: {
			type: DataTypes.STRING(20), allowNull: false, defaultValue: '',
			get: function() { return this.getDataValue('phone'); },
			set: function(phone) { this.setDataValue('phone', phone); }
		},

		photo: {
			type: DataTypes.STRING(100), allowNull: false, defaultValue: 'profile.jpg',
			get: function() { return this.getDataValue('photo'); },
			set: function(photo) { this.setDataValue('photo', photo); }
		},

		comment: {
			type: DataTypes.STRING(100), allowNull: false, defaultValue: '',
			get: function() { return this.getDataValue('comment'); },
			set: function(comment) { this.setDataValue('comment', comment); }
		},

		status: {
			type: DataTypes.ENUM, values: ['active', 'inactive'], allowNull: false, defaultValue: 'inactive',
			get: function() { return this.getDataValue('status'); },
			set: function(status) { this.setDataValue('status', status); }
		}

	}, {
		classMethods: {
			associate: function(models) {
				Employee.hasOne(models.user, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });
			}
	    },

		instanceMethods: {

			checkIfExists: function(obj) {
				var deferred = Q.defer();
				// --------------------------------------
				Employee.find(obj.data).then(function(employee) {
					if (employee) { deferred.resolve(employee); }
					else { deferred.reject({ message: obj.error, model: 'employee' }); }
				});
				// --------------------------------------
				return deferred.promise;
			},

			checkIfNotExists: function(fields, attributes, error) {
				var deferred = Q.defer();

				Employee
				.find({ where: fields, attributes: attributes })
				.then(function (employee) {
					if (employee) { deferred.reject({ message: error, model: 'employee' }); }
					else { deferred.resolve(); }
				});

				return deferred.promise;
			},

			toString : function(){
				return [
					this.id,
					this.firstname,
					this.lastname,
					this.rtn,
					this.gender,
					this.location,
					this.phone,
					this.photo,
					this.comment,
					this.status
				].join(' ');
			}
		},

		paranoid: true,
		tableName: 'Employee'
	});

	return Employee;
};