/**
 * Copyright (c) Xinhuanet Inc. All rights reserved.
 *
 * @License: MIT
 * @Author: SuperWoods
 * @Email:  st_sister@iCloud.com
 * @Date:   2016-07-13-01:46:45
 *
 * @Last modified by:   SuperWoods
 * @Last modified time: 2016-07-14-09:47:35
 */

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    // 显示解析时间
    require('time-grunt')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: {
            src: 'src', // 开发环境目录
            // dist: 'dist-<%= pkg.version %>' // 生产环境目录
            dist: 'dist' // 生产环境目录
        },
        banner: '/**\n' +
            ' * Copyright (c) 2000 - <%= grunt.template.today("yyyy") %> XINHUANET.com All Rights Reserved.\n' +
            ' * <%= pkg.name %> v<%= pkg.version %>\n' +
            ' * @time <%= grunt.template.today("yyyy-mm-dd-HH.MM.ss") %>\n' +
            ' */\n',

        // 清空dist
        clean: {
            dist: {
                src: ['<%= config.dist %>']
            },
            dist2: {
                src: [
                    '<%= config.dist %>/index.html',
                    '<%= config.dist %>/zt1.htm',
                ]
            },
        },

        // copy img 到dist目录，如果启用img压缩模块请关闭这里
        copy: {
            img: {
                files: [{
                    expand: true,
                    cwd: '<%= config.src %>/static/', // Src matches are relative to this path
                    src: ['*.{png,jpg,jpeg,gif,webp,svg}'], // Actual patterns to match
                    dest: '<%= config.dist %>/static/' // Destination path prefix
                }]
            },
            htm: {
                files: [{
                    expand: true,
                    cwd: '<%= config.src %>/',
                    src: ['*.html'], // *.html: all
                    dest: '<%= config.dist %>/', // Destination path prefix.
                    ext: '.htm', // Dest filepaths will have this extension.
                }]
            },
            html: {
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>/',
                    src: ['*.htm'], // *.html: all
                    dest: '<%= config.dist %>/', // Destination path prefix.
                    ext: '.html', // Dest filepaths will have this extension.
                }]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= config.dist %>/*.htm',
            options: {
                dest: '<%= config.dist %>',
            }
        },
        // Performs rewrites based on filerev and the useminPrepare configuration
        usemin: {
            html: ['<%= config.dist %>/{,*/}*.htm'],
            options: {
                assetsDirs: [
                    '<%= config.dist %>',
                ],
            }
        },
        concat: { //css文件合并
            options: {
                preserveComments: 'false', //all 不删除注释，还可以为 false（删除全部注释），some（保留@preserve @license @cc_on等注释）
                banner: '<%= banner %>',
                stripBanners: true
            },
            all: {
                /*
                    输出路径: [
                        输入路径,
                        输入路径
                    ]
                */
                files: {
                    '<%= config.dist %>/static/index.js': [ // bundle js
                        "<%= config.src %>/static/idangerous.swiper.min.js",
                        "<%= config.src %>/static/TweenMax.min.js",
                        "<%= config.src %>/static/jquery.browser.min.js",
                        "<%= config.src %>/static/resLoader.min.js",
                        "<%= config.src %>/static/index.min.js"
                    ],
                    '<%= config.dist %>/static/footer.js': [
                        "<%= config.src %>/static/footer.min.js"
                    ],
                    '<%= config.dist %>/static/index.css': [
                        '<%= config.src %>/static/index.min.css',
                    ],
                    '<%= config.dist %>/static/channel.css': [
                        '<%= config.src %>/static/channel.min.css'
                    ],
                },
            },
            cssAddBanner: {
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>/static/',
                    src: ['*.min.css'],
                    dest: '<%= config.dist %>/static/',
                }]
            }
        },
        cssmin: {
            execute: {
                files: {
                    '<%= config.dist %>/static/index.min.css': ['<%= config.dist %>/static/index.css'],
                    '<%= config.dist %>/static/channel.min.css': ['<%= config.dist %>/static/channel.css'],
                }
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>',
                compress: {
                    drop_console: true
                }
            },
            execute: {
                files: {
                    '<%= config.dist %>/static/index.min.js': ['<%= config.dist %>/static/index.js'],
                    '<%= config.dist %>/static/footer.min.js': ["<%= config.dist %>/static/footer.js"],
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');


    grunt.registerTask('html', ['copy', 'useminPrepare', 'usemin']);

    // default
    grunt.registerTask('default', [
        'clean:dist',
        'copy:htm',
        'concat:all',
        'cssmin',
        'uglify',
        'useminPrepare',
        'usemin',
        'concat:cssAddBanner',
        'copy:html',
        'copy:img',
        'clean:dist2'
    ]);
};
