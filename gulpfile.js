var gulp = require('gulp')
var jsdoc = require('gulp-jsdoc3')

gulp.task('doc', function (cb) {
  //var config = require('./jsdoc.json')
  gulp.src(['./src/classic/form/field/text.js'], {read: false})
      .pipe(jsdoc(cb));
});