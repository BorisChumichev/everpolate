var gulp = require('gulp')
  , browserify = require('browserify')
  , transform = require('vinyl-transform')
  , uglify = require('gulp-uglify')
  , rename = require('gulp-rename')

gulp.task('build', function () {
  var browserified = transform(function(filename) {
    var b = browserify(filename, {standalone: 'everpolate'})
    return b.bundle()
  })
  // Build destination
  var DEST = './'

  return gulp.src(['./lib/everpolate.js'])
    .pipe(browserified)
    .pipe(rename({ extname: '.browserified.js' }))
    .pipe(gulp.dest(DEST))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(DEST))

})