var gulp = require('gulp');
var ts = require('gulp-typescript');  
var babel = require('gulp-babel');
var tsProject = ts.createProject("tsconfig.json");

gulp.task('default', function() {  
    return tsProject.src()
        .pipe(tsProject())
        .pipe(babel())
        .pipe(gulp.dest('dist'));
});