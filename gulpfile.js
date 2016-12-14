const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const babel = require('gulp-babel');


gulp.task('clean', () => {
  return del('dist/*')
});


gulp.task('build', () => {
    return gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['es2015', 'stage-2']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
    return gulp.watch('src/**/*.js', ['build']);
});

gulp.task('serve', ['clean', 'build', 'watch'], function () {
    return nodemon({
        script: 'dist/server.js',
    })
        .on('restart', function () {
            console.log('restarted');
        });
});