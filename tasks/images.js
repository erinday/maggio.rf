// yarn add -D gulp gulp-newer gulp-svgmin
const { src, dest, series } = require('gulp')
const newer = require('gulp-newer')
const svgmin = require('gulp-svgmin')

const env = require('./env')
const { browserSync } = require('./browserSync')
const path = {
  svg: 'assets/images/**/*.svg',
  watch: 'assets/images/**/*.{png,jpg,svg,ico,webp}',
  favicon: 'assets/images/favicon/favicon.ico'
}

function img () {
  return src(path.watch, { ignore: path.svg })
    .pipe(newer(`${env.outputFolder}/statics/images`))
    .pipe(dest(`${env.outputFolder}/statics/images`))
}

function svg () {
  return src(path.svg)
    .pipe(newer(`${env.outputFolder}/statics/images`))
    .pipe(svgmin())
    .pipe(dest(`${env.outputFolder}/statics/images`))
}

function favicon () {
  return src(path.favicon)
    .pipe(dest(`${env.outputFolder}/`))
    .on('end', browserSync.reload)
}

module.exports = {
  build: series(img, svg, favicon),
  path
}
