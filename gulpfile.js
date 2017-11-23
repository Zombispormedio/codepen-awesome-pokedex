const gulp = require('gulp')
const merge = require('gulp-merge')
const buffer = require('vinyl-buffer')
const concat = require('gulp-concat')
const download = require('gulp-download-stream')
const size = require('gulp-size')
const del = require('del')
const inject = require('gulp-inject')
const runSequence = require('run-sequence')
const path = require('path')
const R = require('ramda')
const config = require('./vendor.config')
const defaultToEmpty = R.defaultTo([])
const view = R.curry(R.view)

gulp.task('build-clean', function (cb) {
    return del(['build'])
})

const getJsFromCDN = () => R.pipe(view(R.lensPath(['fromCDN', 'js'])),
    defaultToEmpty, download)(config)
const getJsFromPackages = () => R.pipe(view(R.lensPath(['fromPackages', 'js'])),
    defaultToEmpty, gulp.src)(config)

gulp.task('build-js', function () {
    return merge(
            getJsFromCDN(),
            getJsFromPackages()
        )
        .pipe(buffer())
        .pipe(concat('vendor.bundle.js'))
        .pipe(size())
        .pipe(gulp.dest('./build'))
})

const getJSPath = (file, start='after') => inject(gulp.src(`build/${file}`, {
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

gulp.task('build-js-helper', function () {
    return gulp.src('helper.js')
        .pipe(gulp.dest('./build'))
})

gulp.task('build', function (callback) {
    runSequence('build-clean', ['build-js', 'build-js-helper'],
        'build-html',
        callback);
});