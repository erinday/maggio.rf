// yarn add -D gulp webpack-stream webpack babel-loader @babel/core @babel/preset-env
const { src, dest, series } = require('gulp')
const webpack = require('webpack-stream')

const env = require('./env')
const { browserSync } = require('./browserSync')

const path = {
  entry: 'assets/scripts/*.js',
  watch: 'assets/scripts/**/*.js'
}

const webpackConfig = function () {
  return {
    mode: env.production ? 'production' : 'development',
    entry: {
      app: './assets/scripts/app.js'
    },
    output: {
      filename: env.production ? `script-${env.hash}.js` : 'script.js',
    },
    devtool: env.production ? '' : 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env'] }
        }
      ]
    }
  }
}

const scripts = function () {
  return src(path.entry)
    .pipe(webpack(webpackConfig()))
    .pipe(dest(`${env.outputFolder}/statics/scripts`))
    .on('end', browserSync.reload)
}

module.exports = {
  build: series(scripts),
  path
}
