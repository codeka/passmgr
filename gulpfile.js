var gulp = require('gulp');

gulp.task('default', function() {
  // copy the (non-JS) browser files to the deploy folder.
  gulp.src(["browser/**/*", "!browser/**/*.js"])
      .pipe(gulp.dest("../deploy/browser/"));
});
