var gulp = require('gulp');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
// var imageminMoz = require('imagemin-mozjpeg');
var webp = require('gulp-webp');
var imageResize = require('gulp-image-resize');
var rename = require("gulp-rename");

const imageSrcDirectory = 'src/base_images/';
const imageDestDirectory = 'src/images/';
const stylesDirectory = 'src/styles/';

// SASS TASKS
gulp.task('sass', function(){
  return gulp.src(`${stylesDirectory}/*.scss`)
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest(`${stylesDirectory}`))
});

gulp.task('watch',function() {
  gulp.watch(`${stylesDirectory}*.scss`, gulp.series('sass')); 
});

function resizer(cb) {
  let sizes = [600, 800, 1000, 1200, 1600, 2000];
  for(let size of sizes) {
    gulp.src(`${imageSrcDirectory}**/*.+(jpg|jpeg|webp)`)
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
      .pipe(gulp.dest(`${imageDestDirectory}`))
      .pipe(webp({
        quality: 75,
        preset: 'photo',
        method: 4
      }))
      .pipe(gulp.dest(`${imageDestDirectory}`))
      .on('end', cb);
  }
}

gulp.task('images', function (cb) {
  resizer(cb);
});