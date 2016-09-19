const gulp = require('gulp')
const concat = require('gulp-concat')

gulp.task('styles', () => {
   gulp.src('./src/foundation/*.less')
      .pipe(concat('styles.less'))
      .pipe(gulp.dest('./dist/'))
})

gulp.task('default', ['styles'])
