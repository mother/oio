const path = require('path')
const webpack = require('webpack')

module.exports = {
   devtool: 'eval',
   entry: [
      'webpack-dev-server/client?http://localhost:8000',
      'webpack/hot/only-dev-server',
      './src/demo'
   ],
   output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/dist/'
   },
   plugins: [
      new webpack.HotModuleReplacementPlugin()
   ],
   module: {
      loaders: [{
         test: /\.js$/,
         loaders: ['react-hot', 'babel'],
         include: path.join(__dirname, 'src')
      }]
   }
}
