module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Tasks:
		jade: {
			compile: { options: { data: { debug: true } } }
		},

		stylus: {
			compile: { compress: true }
		},

		// Livereload:
		watch: {
			jade: {
				files: ['./views/*', './views/*.*', './views/*/*.*'],
				tasks: ['jade:compile']
			},
			stylus: {
				files: ['./styles/*.styl', './styles/*/*.*'],
				tasks: ['stylus:compile']
			},
			files: [
				'./*', './public/scripts/*.*', './public/scripts/*/*.js', './public/scripts/*/*/*.js' // JavaScript:
			],
			options: {livereload: true}
		}
	});

	// Enable plugins:
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s):
	grunt.registerTask('default', ['watch']);
};