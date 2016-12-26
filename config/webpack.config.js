const path = require('path')
const webpack = require('webpack')

module.exports = {
   devtool: 'cheap-module-source-map',
   entry: './src/index.js',
   output: {
      path: path.join(__dirname, '..', 'dist'),
      filename: 'index.js',
      libraryTarget: 'umd'
   },
   plugins: [
      new webpack.optimize.UglifyJsPlugin({
         compress: { warnings: false },
         mangle: false,
         sourceMap: true
      }),
      new webpack.DefinePlugin({
         'process.env': {
            NODE_ENV: JSON.stringify('production')
         }
      })
   ],
   externals: {
      react: 'react'
   },
   module: {
      loaders: [{
         test: /\.js$/,
         exclude: /node_modules/,
         loader: 'babel-loader'
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
   }
}
