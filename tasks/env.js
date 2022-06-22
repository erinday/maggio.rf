const production = process.env.NODE_ENV === 'production'
const hash = `${Date.now()}`.substring(0, 8)

module.exports = {
  production,
  hash,
  outputFolder: production ? 'build' : 'dev',
  url: 'https://sitesitesite.ru',
  domain: 'sitesitesite.ru'
}
