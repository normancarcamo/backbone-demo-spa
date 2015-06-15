// This file contains the requirejs config, and it will be the build target for the set of common modules.
requirejs.config({
	baseUrl: 'scripts/',
	paths: {
		angular: 'libs/angular.min',
		backbone: 'libs/backbone-min',
		bootstrap: 'libs/bootstrap.min',
		domReady: 'libs/domReady',
		jquery: 'libs/jquery-2.1.3.min',
		jquery_form: 'libs/jquery.form.min',
		order: 'libs/order',
		underscore: 'libs/underscore-min',
		text: 'libs/text',
		user: 'app/User',
	}
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['./app/main']); // Este archivo se carga antes que cualquier otro, es para el index, y no necesariamente tienes que usar el de backbone.