const gulp = require('gulp')
const less = require('gulp-less')
const concat = require('gulp-concat')

gulp.task('compileCSS', () => {
   gulp.src('./src/foundation/styles.less')
      .pipe(less())
      .pipe(gulp.dest('./dist/'))
})

gulp.task('concatLESS', () => {
   gulp.src(['./src/foundation/*.less', '!./src/foundation/styles.less'])
      .pipe(concat('styles.less'))
      .pipe(gulp.dest('./dist/'))
})

gulp.task('default', ['compileCSS'])
