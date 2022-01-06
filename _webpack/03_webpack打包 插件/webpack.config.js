const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 这jb copy插件有毒似的  tmd  烦死我了

module.exports = {
  // 开发者模式
  // 打包的内容不会进行丑化
  mode: 'development',
  //  建立js映射文件 方便调试代码
  devtool: 'source-map',
  // 入口
  entry: './src/main.js',
  // 出口的位置
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'build'),
    // 这里可以写下asset-module-type的generator配置
    // assetModuleFilename: 'img/[name]_[hash:6][ext]'
  },
  plugins: [
    // 运行打包时 删除原来output的内容
    new CleanWebpackPlugin(),
    // 自动生成一个html的文件
    new HtmlWebpackPlugin({
      template: './public/index.html',   //可以给一个模版
      title: '我是标题'
    }),
  ],
  module: {
    rules: [
      // css-loader
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      // asset-module-type  用来取代url-loader & file-loader (webpack5)
      // webpack5内置  不需要安装loader
      {
        test: /\.(jp?eg|png|gif|svg)$/,
        type: 'asset',
        generator: {
          // 不需要单独写 "."
          filename: 'img/[name]_[hash:6][ext]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 288 * 1024,
          }
        }
      }
    ]
  }
}
