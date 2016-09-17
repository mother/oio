const path = require('path')
const webpack = require('webpack')

module.exports = {
   entry: './src/index.js',
   output: {
      path: path.join(__dirname, 'dist'),
      filename: 'index.js',
      libraryTarget: 'umd'
   },
   plugins: [
      new webpack.optimize.UglifyJsPlugin({
         compress: { warnings: false }
      })
   ],
   externals: {
      react: 'react'
   },
   module: {
      loaders: [{
         test: /\.js$/,
         exclude: /node_modules/,
         loader: 'babel-loader',
         query: {
            presets: ['react', 'es2015', 'stage-0']
         }
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
