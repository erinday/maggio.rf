// yarn add -D gulp gulp-plumber gulp-pug gulp-data gulp-rename
const { src, dest, series } = require('gulp')
const plumber = require('gulp-plumber')
const pug = require('gulp-pug')
const data = require('gulp-data')
const rename = require('gulp-rename')

const env = require('./env')

const dataView = { URL: env.url }

function robots () {
  return src('assets/files/robots.pug')
    .pipe(plumber())
    .pipe(data(dataView))
    .pipe(pug())
    .pipe(rename({ extname: '.txt' }))
    .pipe(dest(env.outputFolder))
}

module.exports = {
  build: series(robots)
}
