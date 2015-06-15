define(function () {
	return Backbone.Router.extend({

		routes: {
			'':	'listEmployees', 					//#
			'employee': 'listEmployees', 			//#employee,
			'employee/profile/:id': 'showEmployee',	//#employee/N,
			'employee/settings/:id': 'editEmployee', //#employee/N,
			'employee/register': 'addEmployee', //#employee/N,
		},

		objeto: {},

		disposeView: function (view) {
			Backbone.View.prototype.close = function () {
				this.unbind();
				this.undelegateEvents();
			};

			/* --Destroy current view */
			if(this.currentView !== undefined) {
				this.currentView.close();
			}

			/* --Create new view */
			this.currentView = view;
			this.currentView.delegateEvents();

			return this.currentView;
		},

		addEmployee: function () {
			var self = this;

			require([
				'./app/employee/Model',
				'text!./app/employee/templates/createEmployee.html'
			], function (Model, Template) {

				var model = new Model();

				var View = Backbone.View.extend({

					el: '#container',

					template: _.template(Template),

					render: function() {
						this.$el.html(this.template);
					},

					initialize: function () {
						this.render();
					},

					events: {
						'click .btn-save-employee' : 'saveEmployee'
					},

					saveEmployee: function(btn) {
						model.save({
							firstname	: $('#input_firstname').val(),
							lastname 	: $('#input_lastname').val(),
							gender   	: $('#input_gender').val(),
							rtn   		: $('#input_rtn').val(),
							location 	: $('#input_location').val(),
							phone   	: $('#input_phone').val(),
							photo   	: $('#input_photo').val(),
							comment  	: $('#input_comment').val(),
							status   	: $('#input_status').val()
						}, {
							success: function (res) {

								self.objeto = res.toJSON();
								var name = self.objeto.firstname.toLowerCase() + self.objeto.lastname.toLowerCase();

								Backbone.history.navigate('employee/profile/' + name, true); // Go to user details.
							}
						});
					}
				});

				self.disposeView(new View());
			});
		},

		editEmployee: function(id) {

			var self = this;

			require([
				'./app/employee/Model',
				'text!./app/employee/templates/employeeEdit.html'
			], function (Model, Template) {

				var model = new Model({id: self.objeto.id});

				var View = Backbone.View.extend({

					el: '#container',

					template: _.template(Template),

					render: function() {
						this.$el.html(this.template(this.model));
					},

					initialize: function () {
						this.render();
					},

					events: {
						'click .btn-edit-employee': 'editButton',
						'click .btn-cancel-employee': 'cancelButton'
					},

					editButton: function(e) {

						var buttonEdit = $(e.currentTarget), canEdit = buttonEdit.attr('data-can-edit') === 'false' ? true : false, str = '';

						if (canEdit) {

							str = buttonEdit.html().replace('Edit', 'Save');
							buttonEdit.html(str);
							buttonEdit.removeClass('btn-danger').addClass('btn-success');
							$('.form-control').removeAttr('disabled');
							$('#input_firstname').focus();
							buttonEdit.attr('data-can-edit', true);

						} else {

							str = buttonEdit.html().replace('Save', 'Edit');
							buttonEdit.html(str);
							buttonEdit.removeClass('btn-success').addClass('btn-danger');
							buttonEdit.attr('data-can-edit', false);
							$('.form-control').attr('disabled', 'disabled');

							//var id = buttonEdit.parent().parent().parent().attr('data-employee-id');
							model.save(this.employeeInformation());
						}
					},

					cancelButton: function(e) {

						var buttonEdit = $('.btn-edit-employee'),
							isButtonEditEnabled = buttonEdit.attr('data-can-edit') === 'false' ? false : true,
							strEdit = buttonEdit.html().replace('Save', 'Edit');

						if (!isButtonEditEnabled) {
							window.history.back();
						}

						$('.btn-edit-employee').removeClass('btn-success').addClass('btn-danger');
						buttonEdit.html(strEdit);
						buttonEdit.attr('data-can-edit', false);
						$('.form-control').attr('disabled', 'disabled');

					},

					employeeInformation: function () {
						return {
							firstname	: $('#input_firstname').val(),
							lastname 	: $('#input_lastname').val(),
							gender   	: $('#input_gender').val(),
							rtn   		: $('#input_rtn').val(),
							location 	: $('#input_location').val(),
							phone   	: $('#input_phone').val(),
							photo   	: $('#input_photo').val(),
							comment  	: $('#input_comment').val(),
							status   	: $('#input_status').val()
						}
					},
				});

				model.fetch({
					success: function (res) {
						self.disposeView(new View({model: res.toJSON()}));
					}
				});
			});
		},

		showEmployee: function (id) {

			var self = this;

			require([
				'./app/employee/Model',
				'text!./app/employee/templates/employeeInformation.html'
			], function (Model, Template) {

				var model = new Model({id: self.objeto.id});
				var View = Backbone.View.extend({

					el: '#container',

					template: _.template(Template),

					render: function() {
						this.$el.html(this.template(this.model));
					},

					initialize: function () {
						this.render();
					},

					events: {
						'click .buttonGoToEdit' : 'goToEdit'
					},

					goToEdit: function(e) {
						Backbone.history.navigate('employee/settings/' + $('div.employeeData').attr('data-employee-id'), true); // Go to user details.
					}
				});

				model.fetch({
					success: function (res) {
						self.disposeView(new View({model: res.toJSON()}));
					}
				});
			});
		},

		listEmployees: function () {

			var self = this;

			require([
				'./app/employee/Collection',
				'./app/employee/Model',
				'text!./app/employee/templates/showEmployees.html',
			], function (Collection, Model, template) {

				var collection = new Collection();
				var View = Backbone.View.extend({
					el: '#container',
					template: _.template(template),
					//models: null,
					/*render: function(models) {
						this.$el.html(this.template({models: models}));
					},*/
					render: function() {
						this.$el.html(this.template({models: this.model}));
					},
					initialize: function () {
						this.render();
					},
					events: {
						'click tr[data-employee-id]': 'showEmployee',
						'click button.btn-edit' : 'buttonEditEmployee',
						'click button.btn-remove' : 'buttonRemoveEmployee',
						'keyup #inputSearch' : 'searchEmployee',
						'click .btnCreateNew' : 'createEmployee'
					},
					showEmployee: function(tr) {

						var data = $($(tr.currentTarget)[0]).children();
						self.objeto.firstname = $(data[0]).text().toLowerCase();
						self.objeto.lastname = $(data[1]).text().toLowerCase();
						self.objeto.fullname = self.objeto.firstname + self.objeto.lastname;
						self.objeto.id = $(tr.currentTarget).attr('data-employee-id');
						Backbone.history.navigate('employee/profile/' + self.objeto.fullname, true); // Go to user details.

						//var id = $(tr.currentTarget).attr('data-employee-id'); // Get id.
						//Backbone.history.navigate('employee/' + id, true); // Go to user details.
					},

					buttonEditEmployee: function(btn) {

						var siblings = $(btn.currentTarget).parent().parent().siblings();
						self.objeto.firstname = $(siblings[0]).text().toLowerCase();
						self.objeto.lastname = $(siblings[1]).text().toLowerCase();
						self.objeto.fullname = self.objeto.firstname + self.objeto.lastname;
						self.objeto.id = siblings.parent().attr('data-employee-id');

						btn.stopPropagation();
						Backbone.history.navigate('employee/settings/' + self.objeto.fullname, true); // Go to user details.
					},

					buttonRemoveEmployee: function(btn) {
						btn.stopPropagation();
						var row = $(btn.currentTarget).parent().parent().parent();
						var id = row.attr('data-employee-id');
						new Model({id: id}).destroy();
						this.$(row).remove();
					},

					searchEmployee: function (e) {

						var text = $(e.currentTarget).val();
						var listTd = $('table tbody tr').children(); // Acá obtenemos todos los td
						var counter = 0;
						var array = [];

						_.each(listTd, function (employee) {

							if ( $(employee).text() === text ) {

								counter++

								$(employee).parent().css('background-color', '#91D5FC'); // Resalta el encontrado con un background.

								$( $(employee).siblings()[3] ).css('background-color', '#fff'); // Las acciones siempre tendrán el background en blanco.

								$('.totalFound').html('<strong>Found: </strong>' + counter).fadeIn(200);

								array.push($(employee).parent());

								if (counter > 1) {

									$('table tbody tr').fadeOut(400);

									setTimeout(function() {
										_.each(array, function (element) {
											element.fadeIn(200);
										});
									}, 300);

								}

							} else {

								if (e.keyCode === 8) {

									$('.totalFound').fadeOut(200);

									$('table tbody tr').fadeIn(200);

									counter = 0;

									$(employee).parent().css('background-color', 'transparent'); // Devuelve el color original al tr resaltado.
								}
							}
						}, this);
					},

					createEmployee: function(btn) {
						Backbone.history.navigate('employee/register', true); // Go to user details.
					}
				});

				collection.fetch({
					success: function (res) {
						self.disposeView(new View({model: res.models}));
					}
				});
			});
		},
	});
});