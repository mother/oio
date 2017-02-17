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
      rules: [{
         test: /\.js$/,
         exclude: /node_modules/,
         use: ['react-hot-loader', 'babel-loader']
      },
      {
         test: /\.less$/,
         use: [
            'style-loader',
            'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
            'resolve-url-loader',
            'less-loader'
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
