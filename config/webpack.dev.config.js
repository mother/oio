const path = require('path')
const webpack = require('webpack')

module.exports = {
   devtool: 'eval',
   entry: [
      'webpack-dev-server/client?http://localhost:8000',
      'webpack/hot/only-dev-server',
      './demo/index.js'
   ],
   output: {
      path: path.join(__dirname, '..', 'dist'),
      filename: 'bundle.js',
      publicPath: '/dist/'
   },
   module: {
      loaders: [{
         test: /\.js$/,
         exclude: /node_modules/,
         loaders: ['react-hot', 'babel-loader']
      },
      {
         test: /\.less$/,
         loaders: [
            'style',
            'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
            'resolve-url',
            'less'
         ]
      }]
   },
   resolve: {
      extensions: ['', '.js']
   },
   plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
   ]
}
