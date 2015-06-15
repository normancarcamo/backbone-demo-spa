// Dependencies:
var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	clientSessions = require('client-sessions'),
	stylus = require('stylus'),
	nib = require('nib'),
	models = require('./models');
	//routes = require('./routes');

// Settings app:
app.set('views', './views');
app.set('view engine', 'jade');
app.locals.pretty = true;

// Middlewares:
app.use(stylus.middleware({
	src: __dirname,
	dest: 'public',
	compile: function(str, path) {
		return stylus(str)
		.set('filename', path)
		.set('paths', ['styles/assets/', 'styles/layouts/', 'styles/partials/'])
		.set('compress', false)
		.use(nib())
		.import('nib')
		//.import('default');
	}
}));
app.use(clientSessions({
	cookieName: 'session',
	secret: 'hakuna_matata',
	duration: 60 * 60 * 1000, // 60 minutes.
	activeDuration: 30 * 60 * 1000, // 30 minutes.
	secure: false, // Only be secure using https.
	httpOnly: true,
	ephemeral: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('./public/'));

// Server listening on port 3000:
app.listen(3000, function() {
	// Sync your db and models before here.
	models.db.sequelize.sync().then(function() {
		// Routes:
		require('./controllers').init(app);
	});
});