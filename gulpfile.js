const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');

gulp.task('build', () => {
    return gulp.src('src/server.js')
        .pipe(babel({
            presets: ['es2015', 'stage-2']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
    return gulp.watch('src/**/*.js', ['build']);
});

gulp.task('serve', ['build', 'watch'], function () {
    return nodemon({
        script: 'dist/server.js',
    })
        .on('restart', function () {
            console.log('restarted');
        });
});