const webpack = require('webpack')

module.exports = {
   devtool: 'cheap-module-source-map',
   entry: './src/index.js',
   output: {
      path: './dist/',
      filename: 'index.js',
      libraryTarget: 'umd'
   },
   externals: {
      react: 'react'
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
      new webpack.DefinePlugin({
         'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }),
      new webpack.optimize.UglifyJsPlugin({
         compress: true,
         mangle: false,
         sourceMap: true
      })
   ]
}
