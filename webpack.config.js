/**
 * Created by yan on 16-1-20.
 */
var path = require('path');

module.exports = {
  entry: path.join(__dirname, 'example', 'src', 'index.jsx'),
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx$/,
      loader: 'babel',
      include: [
        path.join(__dirname, 'example')
      ]
    }],
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test:/\.less$/,
        use: ['style-loader','css-loader','less-loader'],        
      },
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'example')
  }
}