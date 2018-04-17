const path = require('path')

module.exports = {
   mode: 'production',
   entry: {
      main: './src/index.js'
   },
   output: {
      path: path.resolve(__dirname, '../dist'),
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
   }
}
