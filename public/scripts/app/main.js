// Dependencies: jquery, underscore, backbone & domReady.
define([
	'jquery',
	'underscore',
	'backbone',
	'order!./router'
], function($, _, Backbone, Router) {
	require(['order!bootstrap', 'order!domReady'], function(bootstrap, domReady) {
		domReady(function() {

			window.App = {
				Router: {}
			};

			App.Router = new Router();

			Backbone.history.start({pushState: false});

			$('ul.nav.navbar-nav.navbar-left').children().removeClass('active');
			//$('#tabemployee').addClass('active');
			// ---------------------------------------------------------------------------- Events Tabs:

			$('#tabemployee').on('mouseover', function (event) {
				$('#tabemployee').addClass('active');
				$('#ulEmployees').fadeIn();
			});

			$('body').on('click', function (evemt) {
				$('ul.nav.navbar-nav.navbar-left').children().removeClass('active');
				$('#ulEmployees').fadeOut();
			});

			/*
			$('#tabemployee').on('click', function (event) {
				$(this).parent().children().removeClass('active');
				$(this).addClass('active');
			});
			*/

			$('#tabuser').on('click', function (event) {
				$(this).parent().children().removeClass('active');
				$(this).addClass('active');
			});

			$('a#tabRegister').on('click', function (event) {
				$(this).parent().children().removeClass('active');
				$(this).addClass('active');
			});
		});
	});
});
