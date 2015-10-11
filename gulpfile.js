var gulp = require('gulp');
var browserify = require('browserify');
var partialify = require('partialify');
var source = require('vinyl-source-stream');

gulp.task('js', function() {
    browserify('js/app.js')
        .transform(partialify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('js'))
});

gulp.task('default', ['js']);