// yarn add -D gulp-sass sass gulp-autoprefixer gulp-group-css-media-queries gulp-clean-css gulp-header gulp-rename
const { src, dest, series } = require('gulp')
const header = require('gulp-header')
const sass = require('gulp-sass')(require('sass'))
const autoPrefixer = require('gulp-autoprefixer')
const gcmq = require('gulp-group-css-media-queries')
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')

const env = require('./env')
const { browserSync } = require('./browserSync')

const path = {
  pages: 'assets/styles/pages/*.sass',
  watch: 'assets/styles/**/*.sass',
}

const suffix = `-${env.hash}`

const styles = function () {
  if (env.production) {
    return src(path.pages)
      .pipe(header('@import "../variables"\n'))
      .pipe(sass().on('error', sass.logError))
      .pipe(autoPrefixer(['last 2 versions', '> 0.7%']))
      .pipe(gcmq())
      .pipe(cleanCSS({ level: 2 }))
      .pipe(rename({ suffix }))
      .pipe(dest(`${env.outputFolder}/statics/styles`))
  }
  return src(path.pages)
    .pipe(header('@import "../variables"\n'))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoPrefixer(['last 2 versions', '> 0.7%']))
    .pipe(gcmq())
    .pipe(cleanCSS({
      level: 2,
      format: 'beautify'
    }))
    .pipe(dest(`${env.outputFolder}/statics/styles`))
    .on('end', () => browserSync.reload('*.css'))
}


module.exports = {
  build: series(styles),
  path
}
