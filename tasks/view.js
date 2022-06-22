// yarn add -D gulp gulp-pug gulp-data gulp-plumber gulp-typograf gulp-format-html gulp-htmlmin gulp-header gulp-rename

const { src, dest, series } = require('gulp')
const pug = require('gulp-pug')
const data = require("gulp-data")
const plumber = require('gulp-plumber')
const typograf = require('gulp-typograf')
const formatHtml = require('gulp-format-html')
const htmlmin = require('gulp-htmlmin')
const rename = require('gulp-rename')
const { browserSync } = require('./browserSync')

const env = require('./env')

const path = {
  pages: 'assets/views/pages/*.pug',
  watch: 'assets/views/**/*.pug',
  error: 'assets/views/pages/404.pug',
  siteMap: 'assets/views/pages/_site-map.pug'
}

const typografConfig = {
  locale: ['ru', 'en-US'],
  safeTags: [
    ['<\\?php', '\\?>'],
    ['<head>', '</head>']
  ]
}

const htmlminConfig = { collapseWhitespace: true, conservativeCollapse: true, minifyJS: true, minifyCSS: true }

function dataView (file) {
  return {
    VIEW: file.stem,
    PRODUCTION: env.production,
    HASH: env.hash,
    URL: env.url,
    DOMAIN: env.domain
  }
}

function view () {
  if (env.production) {
    return src(path.pages, { ignore: [ path.siteMap ] })
      .pipe(plumber())
      .pipe(data(dataView))
      .pipe(pug())
      .pipe(typograf(typografConfig))
      .pipe(htmlmin(htmlminConfig))
      .pipe(dest(env.outputFolder))
  }
  return src(path.pages)
    .pipe(plumber())
    .pipe(data(dataView))
    .pipe(pug())
    .pipe(formatHtml())
    .pipe(typograf(typografConfig))
    .pipe(dest(env.outputFolder))
    .on('end', browserSync.reload)
}

function sitemap () {
  return src(path.siteMap)
    .pipe(plumber())
    .pipe(data(dataView))
    .pipe(pug())
    .pipe(rename({
      basename: 'sitemap',
      extname: ".xml"
    }))
    .pipe(dest(env.outputFolder))
}

module.exports = {
  build: env.production ? series(view, sitemap): series(view),
  path
}
