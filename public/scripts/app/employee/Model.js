define([], function() {
	return Backbone.Model.extend({
		urlRoot: '/employee', // For every REST action. put, post, delete and get.
		//identifier: null,
		//idAttribute: 'identifier',
		//id: 'identifier',
		defaults: {
			firstname: 'unknown',
			lastname: 'unknown',
			gender: 'Male',
			rtn: 'unknown',
			location: 'unknown',
			phone: 'unknown',
			photo: 'unknown',
			comment: '',
			status: 'inactive'
		},
		initialize: function() {
			this.on('change:firstname change:lastname change:gender change:rtn change:location change:phone change:photo change:comment change:status', function (model) {
				//console.log('changed!!!!!');
				//if(!this.isValid()) {
				//	console.error(this.validationError);
				//}
			}, this);
		}
		/*validate: function(attrs, options) {
			if (!attrs.id || !attrs.firstname || !attrs.lastname || !attrs.email || !attrs.role) {
				return 'You have to provide only data valid!';
			}
		},
		*/
	});
});