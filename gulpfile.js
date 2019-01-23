'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync');
var babel = require('gulp-babel');
 
var cssSPATH = './src/sass/';
var cssDPATH = './assets/css/';

gulp.task('sass', function () {
      return gulp.src(cssSPATH + '**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(cssDPATH));
});

var jsSPATH = './src/javascripts/'
var jsDPATH = './assets/javascripts/'
  
gulp.task('babel', function() {
  gulp.src(jsSPATH + '**/*.js')
    .pipe(babel())
    .pipe(gulp.dest(jsDPATH))
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: ".",
            index  : "index.html"
        }
    });
});

gulp.task('bs-reload', function() {
    browserSync.reload();
});

gulp.task('js:watch', function () {
    gulp.watch(jsSPATH + '**/*.js', ['babel', 'bs-reload']);
});

gulp.task('sass:watch', function () {
    gulp.watch(cssSPATH + '**/*.scss', ['sass', 'bs-reload']);
});

gulp.task('html:watch', function() {
    gulp.watch('./**/*.html', ['bs-reload']);
});

gulp.task('js:manuel', function () {
    gulp.watch(jsSPATH + '**/*.js', ['babel']);
});

gulp.task('sass:manuel', function () {
    gulp.watch(cssSPATH + '**/*.scss', ['sass']);
});

gulp.task('html:manuel', function() {
    gulp.watch('./**/*.html');
});

gulp.task('default', ['browser-sync', 'js:watch', 'html:watch', 'sass:watch']);
gulp.task('manuel', ['browser-sync', 'js:manuel', 'html:manuel', 'sass:manuel']);
