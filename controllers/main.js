// Dependencies:
var models = require('../models').db,
	_ = require('underscore');

module.exports = function(app) {

	app.get('/', function (req, res) {
		return res.render('index', {
			title: 'Backbone.JS'
		});
	});

	app.get('/employee', function (req, res) {

		models.employee.findAll()
		.then(function (employees) {
			var list = [];

			_.each(employees, function (employee) {
				delete employee.dataValues.createdAt;
				delete employee.dataValues.updatedAt;
				delete employee.dataValues.deletedAt;
				list.push(employee.dataValues);
			});

			return res.json(list);
		}).catch(function (err) {
			return console.error(err);
		});
	});

	app.post('/employee', function (req, res) {

		models.employee
		.create(req.body)
		.then(function (employee) {
			return res.status(200).json({id: employee.dataValues.id});
		}).catch(function (err) {
			return console.error(err);
		});

	});

	app.get('/employee/:id', function (req, res) {

		var id = Number(req.params.id);

		models
		.employee
		.findById(id)
		.then(function(employee) {

			delete employee.dataValues.createdAt;
			delete employee.dataValues.updatedAt;
			delete employee.dataValues.deletedAt;

			return res.json(employee.dataValues);

		}).catch(function(err) {
			console.error(err);
		});

	});

	app.put('/employee/:id', function (req, res) {

		var id = req.body.id;
		delete req.body.id;
		delete req.body.createdAt;
		delete req.body.updatedAt;
		delete req.body.deletedAt;

		models
		.employee
		.update(req.body, {where: {id: id}})
		.then(function() {
			return res.status(204).send();
		}).catch(function(err) {
			console.error(err);
		});

	});

	app.delete('/employee/:id', function (req, res) {
		var id = Number(req.params.id);
		console.log('DELETE!!!!!!! -> ' + id );
		models.employee.findById(id)
		.then(function(employee) {
			employee.destroy().then(function() {
				return res.status(200).send();
			});
		}).catch(function(error) {
			console.error(error);
		});
	});
};
