var nodemailer  = require('nodemailer'),
	credentials = require('./credentials');

module.exports.send = function(to, subject, text, html, callback) {
	nodemailer.createTransport({
		service: 'Gmail',
		auth: {user: credentials.emailUser, pass: credentials.emailPass}
	}).sendMail({
		from: 'Ordersfly ✔ <support@ordersfly.com>',
		to: to,
		subject: subject,
		text: text,
		html: html
	}, callback);
};