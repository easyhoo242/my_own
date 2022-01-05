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
      {
        test: /\.(jpg|png|jpeg|svg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            // outputPath是可以省略不写的  直接在name中使用/拼接 /之前的就是文件夹的名字
            // outputPath: 'img',
            // placeHolder
            // name 是文件名  hash冒号后面选择保留多少位 ext是保留原来的拓展名
            // name: '[name]_[hash:6].[ext]'
            name: 'img/[name]_[hash:6].[ext]'
          }
        }
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
