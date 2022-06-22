const { src, dest, series } = require('gulp')

const env = require('./env')

function fonts () {
  return src('assets/fonts/*.*')
    .pipe(dest(`${env.outputFolder}/statics/fonts`))
}

module.exports = {
  build: series(fonts)
}
