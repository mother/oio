module.exports = {
   mode: 'development',
   entry: [
      './tests/Input.js'
   ],
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
   resolve: {
      extensions: ['.js'],
      enforceExtension: false
   }
}
