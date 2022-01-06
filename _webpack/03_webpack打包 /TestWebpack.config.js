const path = require('path')
module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        text: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'scss-loader'
        ]
      },
      {
        test: /\.(jpg|png|gif|svg|jpeg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'img/[name]_[hash:6].[ext]'
          }
        }
      }
    ]
  }
}