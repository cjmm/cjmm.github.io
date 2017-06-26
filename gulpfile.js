/**
 * @Author: SuperMoo <SuperWoods>
 * @Date:   2017-05-15-16:08:47
 * @Email:  st_sister@me.com
 * @Filename: gulpfile.js
 * @Last modified by:   SuperWoods
 * @Last modified time: 2017-06-15-11:23:09
 * @License: MIT
 * @Copyright: Copyright (c) Xinhuanet Inc. All rights reserved.
 */

// version 0.1.1

const browsersync = require('browser-sync').create();
const gulp = require('gulp');
const jade = require('gulp-jade');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const jsImport = require('gulp-js-import');
const postcss = require('gulp-postcss');
const atImport = require('postcss-import');
const rename = require("gulp-rename");
const header = require('gulp-header');
const dateFormat = require('dateformat');
const pkg = require('./package.json');
const stripDebug = require('gulp-strip-debug');

const getTime = (formats) => {
    const now = new Date();
    return dateFormat(now, formats);
}
const banner = [
    '/**',
    ` * Copyright (c) 2000 - ${getTime("yyyy")} XINHUANET.com All Rights Reserved.`,
    ` * ${pkg.name} v${pkg.version}`,
    ` * @time ${getTime("yyyy-mm-dd HH:MM:ss")}`,
    ' */',
    ''
].join('\n');

gulp.task('browsersync', function() {
    var files = [
        '*.htm',
        '*.html',
        'css/*.css',
        'js/*.js',
        'bundle/*.css',
        'bundle/*.js',
        'bundle/*.png',
        'bundle/*.jpg',
        'bundle/*.gif',
        'jade/*.jade',
    ];
    browsersync.init(files, {
        server: {
            baseDir: './'
        },
        notify: true,
    });
});

// jade
gulp.task('jade', function() {
    return gulp.src('jade/*.jade')
        .pipe(plumber())
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('babel', function() {
    return gulp.src([
            'js/index.js',
        ])
        .pipe(jsImport()) // jsImport
        .pipe(gulp.dest('import'))
        // .pipe(sourcemaps.init())
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        })) //错误处理
        .pipe(babel({
            presets: ['es2015']
        }))
        // .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('bundle'));
});

gulp.task('css', function() {
    return gulp.src('css/index.css')
        .pipe(postcss([
            atImport()
        ]))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('bundle'));
});

// watch
gulp.task('autowatch', function() {
    gulp.watch('css/*.css', ['css']);
    gulp.watch('js/*.js', ['babel']);
    gulp.watch('jade/*.jade', ['jade']);
});

// --------------------------------------------------------------- 生产模式压缩输出
gulp.task('indexMinCSS', function() {
    gulp.src('bundle/index.css')
        .pipe(rename('index.min.css'))
        .pipe(cleancss({
            advanced: true, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie8', //保留ie8及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: true, //类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
            //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(gulp.dest('bundle'));
});

gulp.task('indexAllMinJS', function() {
    gulp.src([
            // 'bundle/swiper.min.js',
            // 'bundle/jquery.qrcode.min.js',
            // 'bundle/jquery.jplayer.min.js',
            // 'bundle/jquery.jplayer.playlist.mobile.js',
            'bundle/index.js',
        ])
        .pipe(concat('index.all.js')) //合并后的文件名
        .pipe(gulp.dest('bundle'))
        .pipe(stripDebug()) // 删除 console
        .pipe(rename('index.all.min.js'))
        // .pipe(sourcemaps.init())
        .pipe(uglify())
        // .pipe(sourcemaps.write('../maps'))
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(gulp.dest('bundle'));
});

// gulp.task('single', function() {
//     gulp.src([
//             'bundle/name.js',
//             // 'bundle/name1.min.js',
//         ])
//         // .pipe(concat('name.all.js')) //合并后的文件名
//         // .pipe(gulp.dest('bundle'))
//         .pipe(stripDebug()) // 删除 console
//         .pipe(rename('name.min.js'))
//         // .pipe(sourcemaps.init())
//         .pipe(uglify())
//         // .pipe(sourcemaps.write('../maps'))
//         .pipe(header(banner, {
//             pkg: pkg
//         }))
//         .pipe(gulp.dest('bundle'));
// });

// ------------------------------------------------------------------------ 命令
// 开发模式 gulp
gulp.task('default', [
    'autowatch',
    'browsersync'
]);

// 生产模式 gulp build
gulp.task('build', [
    'indexMinCSS',
    'indexAllMinJS',
]);
