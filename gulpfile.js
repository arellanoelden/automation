var gulp = require('gulp');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
// var imageminMoz = require('imagemin-mozjpeg');
var webp = require('gulp-webp');
var imageResize = require('gulp-image-resize');
var rename = require("gulp-rename");

// SASS TASKS
gulp.task('sass', function(){
  return gulp.src('src/styles/*.scss')
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('src/styles/'))
});

gulp.task('watch',function() {
  gulp.watch('src/styles/*.scss', gulp.series('sass')); 
});

function resizer(cb) {
  let sizes = [600, 800, 1000, 1200, 1600, 2000];
  for(let size of sizes) {
    gulp.src('src/base_images/**/*.+(jpg|jpeg|webp)')
      .pipe(imagemin({
        progressive: true,
      }))
      .pipe(rename({
        suffix: `_${size}w`
      }))
      .pipe(imageResize({
        width: size,
        upscale: false
      }))
      .pipe(gulp.dest('src/images'))
      .pipe(webp({
        quality: 75,
        preset: 'photo',
        method: 4
      }))
      .pipe(gulp.dest('src/images'))
      .on('end', cb);
  }
}

gulp.task('images', function (cb) {
  resizer(cb);
});