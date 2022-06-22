// yarn add cross-env
// yarn add -D gulp
'use strict'
const gulp = require('gulp')
const clean = require('./tasks/clean')
const fonts = require('./tasks/fonts')
const view = require('./tasks/view')
const styles = require('./tasks/styles')
const scripts = require('./tasks/scripts')
const img = require('./tasks/images')
const copy = require('./tasks/copy')
const { runServe } = require('./tasks/browserSync')

gulp.task('watch', () => {
  gulp.watch(view.path.watch, gulp.series(view.build))
  gulp.watch(styles.path.watch, gulp.series(styles.build))
  gulp.watch(scripts.path.watch, gulp.series(scripts.build))
  gulp.watch(img.path.watch, gulp.series(img.build))
})

gulp.task('build', gulp.series(
  clean.all,
  fonts.build,
  styles.build,
  scripts.build,
  img.build,
  copy.build,
  view.build,
))

gulp.task('default', gulp.series('build', gulp.parallel('watch', runServe)))
