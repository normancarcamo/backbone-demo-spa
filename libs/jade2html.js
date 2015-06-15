var jade = require('jade'),
	path = require('path');

module.exports.compile = function(view, locals, options, callback) {
	
	var file = path.resolve(__dirname, '../views/' + view),
		fn 	 = jade.compileFile(file, options),
		html = fn(locals);

	callback(html);
};