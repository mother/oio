const express = require('express')
const webpack = require('webpack')
const webpackConfig = require('./config/webpack.dev.config')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

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
   res.sendFile('index.html', { root: `${__dirname}/demo/` })
})

app.listen(8000)
