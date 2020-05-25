'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const server = require('browser-sync').create();
const concat = require('gulp-concat');
const del = require('del');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const svgstore = require('gulp-svgstore');
const posthtml = require('gulp-posthtml');
const include = require('posthtml-include');
const htmlmin = require('gulp-htmlmin');

gulp.task('clean', function() {
  return del('build');
});

gulp.task('copy', function() {
  return gulp.src([
    'source/fonts/**/*.{woff,woff2}'
  ], {
    base: 'source'
  })
  .pipe(gulp.dest('build'));
});

gulp.task('js', function() {
  return gulp.src(['source/js/**/*.js'])
    .pipe(sourcemap.init())
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(sourcemap.write())
    .pipe(gulp.dest('build/js'));
});

gulp.task('img', function() {
  return gulp.src('source/img/**/*.{png,jpg,svg}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({progressive: true}),
      imagemin.svgo({plugins: [{removeViewBox: false}]})
    ]))
    .pipe(gulp.dest('build/img'));
});

gulp.task('webp', function () {
  return gulp.src('source/img/**/*.{png,jpg}')
  .pipe(webp({quality: 70}))
  .pipe(gulp.dest('build/img'));
});

gulp.task('css', function () {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('svg', function () {
  return gulp.src('source/img/**/*.svg')
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
});

gulp.task('html', function () {
  return gulp.src('source/*.html')
  .pipe(posthtml([
    include()
  ]))
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('build'));
});

gulp.task('refresh', function (done) {
  server.reload();
  done();
});

gulp.task('server', function () {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/sass/**/*.scss', gulp.series('css'));
  gulp.watch('source/img/**/*.svg', gulp.series('svg','img','refresh'));
  gulp.watch('source/**/*.html', gulp.series('html', 'refresh'));
  gulp.watch('source/js/**/*.js', gulp.series('js','refresh'));
});

gulp.task('build', gulp.series('clean','copy','img','webp','css','svg','js','html'));
gulp.task('start', gulp.series('build', 'server'));
