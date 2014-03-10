/* jshint node:true */

var fs = require('fs');

module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-git');
	grunt.loadNpmTasks('grunt-replace');

	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		clean : {
			appServerDist : ['appServerDist/**']
		},
		useminPrepare : {
			html : 'AppServerDist/index.html',
			options : {
				dest : '/AppServerDist',
				root : 'AppServerDist'
			}
		},
		concat : {
			css : {

				src : ['App/resource/css/**/*.css'],
				dest : 'AppServerDist/resource/css/app.css',
			},
			js : {

				src : ['App/lib/**/*.js', 'App/src/**/*.js'],
				dest : 'AppServerDist/js/app.js',
			}
		},

		uglify : {
			'AppServerDist/js/app_<%= pkg.version %>_min.js' : ['AppServerDist/js/app_<%= pkg.version %>.js']
		},
		copy : {
			appServerDist : {
				files : [{
					expand : true,
					cwd : 'App/',
					src : ['**', '!src/**', '!lib/**', '!resource/css/**'],
					dest : 'AppServerDist/'
				}]
			},

		},
		usemin : {
			html : 'AppServerDist/index.html',
		}

	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-targethtml');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-bower-task');

	grunt.registerTask('update-version-number', function() {
		var packageJson = grunt.file.readJSON('package.json');
		var appConfigAppServer = grunt.file.readJSON('AppServerDist/app.json');

		var versions = packageJson.version.split('.');
		var updatedVersionNumber = versions[0] + '.' + versions[1] + '.' + (parseInt(versions[2], 10) + 1);

		packageJson.version = updatedVersionNumber;
		appConfigAppServer.version = updatedVersionNumber;

		grunt.file.write('./package.json', JSON.stringify(packageJson, null, 2));
		grunt.file.write('./AppServerDist/app.json', JSON.stringify(appConfigAppServer, null, 2));
	});

	// Create app server package
	grunt.registerTask('app-server-task', function() {

		grunt.task.run(['clean:appServerDist', 'copy:appServerDist', 'useminPrepare', 'concat', 'uglify', 'usemin']);
	});

	grunt.registerTask('uv', ['update-version-number']);
	grunt.registerTask('as', ['app-server-task', 'update-version-number']);
	grunt.registerTask('app-server', ['app-server-task', 'update-version-number']);

};
