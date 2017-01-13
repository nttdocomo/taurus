var gulp = require('gulp')
var jsdoc = require('gulp-jsdoc3')

gulp.task('doc', function (cb) {
  //var config = require('./jsdoc.json')
  gulp.src(['./src/view/base.js', './src/classic/form/field/text.js', './test.js'], {read: false})
      .pipe(jsdoc(cb));
});