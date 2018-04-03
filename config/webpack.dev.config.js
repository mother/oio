const path = require('path')
const webpack = require('webpack')

module.exports = {
   mode: 'development',
   entry: [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      './demo/index.js'
   ],
   output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'bundle.js',
      publicPath: '/dist/'
   },
   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader']
         },
         {
            test: /\.less$/,
            use: [
               'style-loader',
               'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
               'resolve-url-loader',
               'less-loader'
            ]
         }
      ]
   },
   plugins: [
      new webpack.HotModuleReplacementPlugin()
   ],
   resolve: {
      extensions: ['.js'],
      enforceExtension: false
   }
}
