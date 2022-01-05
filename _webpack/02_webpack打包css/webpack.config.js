const path = require('path')
module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      // {
      //   // css-loader只负责将css文件解析
      //   // style-loader 完成css的插入操作

      //   // $ npm install style-loader -D

      //   // 写法一：
      //   // test: /\.css$/,
      //   // loader: 'css-loader'

      //   // 写法二：
      //   test: /\.css$/,
      //   // 完整写法： 
      //   // use: [
      //   //   loader: 'caa-loader',
      //   // ],
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //   ]
      // },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      // {
      //   text: /\.scss$/,
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //     'scss-loader'
      //   ]
      // }
    ]
  }
}
