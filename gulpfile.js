var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');
var path = require('path');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var tsconfig = require("./tsconfig.json");

gulp.task('default', ['compile', 'compile-tests', 'compile-less', 'copy-js', 'copy-html']);

gulp.task('compile', function() {
    return gulp.src("src/**/!(*Spec).ts*")
        .pipe(sourcemaps.init())
        .pipe(ts(tsconfig.compilerOptions))
        //.pipe(concat("main.js"))
        .pipe(sourcemaps.write('.', {
            sourceRoot: function(file) { return file.cwd + '/src'; }
        }))
        .pipe(gulp.dest("app"));
});

gulp.task('compile-tests', function() {
    return gulp.src("src/**/*Spec.js*")
        .pipe(sourcemaps.init())
        // .pipe(ts(tsconfig.compilerOptions))
        // //.pipe(concat("main.js"))
        // .pipe(sourcemaps.write('.', {
        //     sourceRoot: function(file) { return file.cwd + '/src'; }
        // }))
        .pipe(gulp.dest("test"));
});

gulp.task('copy-js', function() {
    return gulp.src("src/**/!(*Spec).js").pipe(gulp.dest("app"));
});

gulp.task('compile-less', function () {
  return gulp.src('src/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('copy-html', function() {
    return gulp.src("src/**/*.html").pipe(gulp.dest("app"));
});

gulp.task('watch', ['default', 'watch-ts', 'watch-tests', 'watch-js', 'watch-html', 'watch-less']);

gulp.task('watch-ts', function(){
    gulp.watch(["src/**/!(*Spec).ts", "src/**/*.tsx"], ['compile']);
});

gulp.task('watch-tests', function(){
    gulp.watch(["src/**/*Spec.ts"], ['compile-tests']);
});

gulp.task('watch-js', function(){
    gulp.watch(["src/**/*.js"], ['copy-js']);
});

gulp.task('watch-html', function(){
    gulp.watch(["src/**/*.html"], ['copy-html']);
});

gulp.task('watch-less', function(){
    gulp.watch(["src/**/*.less"], ['compile-less']);
});

gulp.task('clean', function() {
    return del(["app"]);
});
