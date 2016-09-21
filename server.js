const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./config/webpack.dev.config')

new WebpackDevServer(webpack(config), {
   publicPath: config.output.publicPath,
   hot: true,
   historyApiFallback: true
}).listen(8000, 'localhost', (err, result) => {
   if (err) {
      return console.log(err) // eslint-disable-line no-console
   }
   console.log('Listening at http://localhost:8000/') // eslint-disable-line no-console
})
