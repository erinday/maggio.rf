// yarn add -D del
const del = require('del')
const env = require('./env')

function clean () {
  return del(env.outputFolder)
}

module.exports = {
  all: clean,
}
