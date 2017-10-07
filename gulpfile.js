var gulp =  require('gulp');
var sass = require('gulp-sass')


gulp.task('sass', () => {
  return gulp.src('sass/entry.scss')
    .pipe(sass())
    .pipe(gulp.dest('build/'))
})
