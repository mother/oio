const gulp = require('gulp')
const less = require('gulp-less')

gulp.task('styles', () => {
   gulp.src('./src/foundation/styles.less')
      .pipe(less())
      .pipe(gulp.dest('./dist/'))
})

gulp.task('default', ['styles'])
