const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('../config/webpack.dev.config')

const app = express()
const compiler = webpack(webpackConfig)

app.use(webpackDevMiddleware(compiler, {
   publicPath: webpackConfig.output.publicPath,
   noInfo: true,
   quiet: false,
   historyApiFallback: true,
   stats: {
      colors: true
   }
}))

app.use(webpackHotMiddleware(compiler, {
   log: console.log, // eslint-disable-line no-console
   path: '/__webpack_hmr',
   heartbeat: 10 * 1000
}))

app.get('*', (req, res, next) => {
   res.sendFile('index.html', { root: `${__dirname}/` })
})

const server = app.listen(8000, () => {
   const port = server.address().port
   const pattern = Array(80).join('=')
   /* eslint-disable */
   console.log(`\n${pattern}`)
   console.log(`Starting OIO Demo on port ${port} at ${new Date()}`)
   console.log(`${pattern}\n`)
   /* eslint-enable */
})
