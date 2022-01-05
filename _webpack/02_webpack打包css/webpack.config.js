const path = require('path')
module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: []
  }
}

// let HtmlWebpackPlugin = require('html-webpack-plugin');
// const path = require('path');
// module.exports = {
//   // entry: './src/index.js',
//   // output: {
//   //   filename: 'bundle.js',
//   //   path: path.resolve(__dirname, 'dist')
//   // },
//   entry: {
//     app: './src/index.js',
//     print: './src/print.js'
//   },
//   output: {
//     filename: '[name].bundle.js',
//     path: path.resolve(__dirname, 'dist')
//   },
//   module: {
//     rules: [
//       {
//         test: /\.css$/,
//         use: [
//           'style-loader',
//           'css-loader'
//         ]
//       }, {
//         test: /\.(png|svg|jpg|gif)$/,
//         use: [
//           'file-loader'
//         ]
//       }
//     ]
//   }
// }

