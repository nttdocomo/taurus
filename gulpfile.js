var gulp = require('gulp')
var jsdoc = require('gulp-jsdoc3')

gulp.task('doc', function (cb) {
  var config = require('./jsdoc.json')
  gulp.src(['./src/view/base.js', './src/classic/panel/panel.js', './src/classic/form/label.js', './src/classic/form/field/base.js', './src/classic/form/field/text.js', './test.js'], {read: false})
      .pipe(jsdoc(config, cb));
});