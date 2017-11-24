const gulp = require('gulp')
const merge = require('gulp-merge')
const buffer = require('vinyl-buffer')
const concat = require('gulp-concat')
const download = require('gulp-download-stream')
const size = require('gulp-size')
const del = require('del')
const inject = require('gulp-inject')
const runSequence = require('run-sequence')
const webpack = require('webpack-stream')
const path = require('path')
const R = require('ramda')
const config = require('./vendor.config')
const defaultToEmpty = R.defaultTo([])
const view = R.curry(R.view)

gulp.task('build-clean', function (cb) {
    return del(['build', 'pre-build'])
})

const getJsFromCDN = () =>
    R.pipe(view(R.lensPath(['fromCDN', 'js'])), defaultToEmpty, download)(config);

gulp.task('build-cdn', function () {
    return getJsFromCDN()
        .pipe(buffer())
        .pipe(concat('cdn.bundle.js'))
        .pipe(size())
        .pipe(gulp.dest('./pre-build'))
})

const getJSPath = (file, start = 'after') => inject(gulp.src(`build/${file}`, {
    read: false
}), {
    starttag: `<!-- inject:${start}:js -->`,
    transform: function (filepath) {
        return ` <script src="${path.basename(filepath)}"></script>`
    }
})

gulp.task('build-html', function () {
    return gulp.src('index.html')
        .pipe(getJSPath('vendor.bundle.js', 'before'))
        .pipe(getJSPath('helper.js'))
        .pipe(gulp.dest('./build'))
})

gulp.task('assets', function () {
    return gulp.src(['helper.js', 'favicon.ico'])
        .pipe(gulp.dest('./build'))
})

gulp.task('build-webpack', function () {
    return gulp.src('entry.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('./pre-build'));
})

gulp.task('build-js', function () {
    return gulp.src('pre-build/*.js')
        .pipe(concat('vendor.bundle.js'))
        .pipe(gulp.dest('./build'));
})

gulp.task('build', function (callback) {
    runSequence('build-clean', 
		'assets',
		['build-webpack', 'build-cdn'],
        'build-js',
        'build-html',
        callback);
});