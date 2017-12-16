var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var buffer = require('vinyl-buffer');

gulp.task('default', function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/index.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .transform('babelify', {
        presets: ['env'],
        extensions: ['.ts']
    })
    .bundle()
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(gulp.dest('dist'));
});