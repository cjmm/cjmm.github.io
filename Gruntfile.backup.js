/**
 * @project xinhuaRadio
 * @file    Gruntfile.js
 * @author  St. <st_sister@icloud.com>
 * @time    2015-12-15-14.46
 *          2016-02-08-19.55
 */
module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner: '/**\n'+
				//' * Copyright (c) <%= grunt.template.today("yyyy") %> Xinhuanet Inc. All rights reserved.\n' +
				' * <%= pkg.name %>\n' +
				' * @time <%= grunt.template.today("yyyy-mm-dd-HH.MM.ss") %>\n' +
				' */\n',
		// js混淆压缩
		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			execute: {
				files: {
					'js/index.min.js': ['js/index.js']
				}
			}
		},
		// css压缩
		cssmin: {
			options: {
				//shorthandCompacting: false,
				//roundingPrecision: -1
			},
			execute: {
				files: {
					'css/index.min.css': ['css/index.css'],
				}
			}
		},
		// 给压缩后的css添加注释
		concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: true
			},
			cssAddBanner: {
				files: {
					'css/index.min.css': ['css/index.min.css'],
				}
			}
		},
	});
	
	require('load-grunt-tasks')(grunt);
//	grunt.registerMultiTask('log', 'Log stuff.', function() {
//		grunt.log.writeln(this.target + ': ' + this.data);
//	});
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	
	grunt.registerTask('default', ['uglify', 'cssmin', 'concat']);
};