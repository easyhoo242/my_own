const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const { DefinePlugin } = require('define-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 这jb copy插件有毒似的  tmd  烦死我了
// vue-loader-plugin
const { VueLoaderPlugin } = require('vue-loader/dist/index')

// 开发阶段 contentBase
// 打包阶段 CopyWebpackPlugin

module.exports = {
  // 开发者模式
  // 打包的内容不会进行丑化
  mode: 'development',
  //  建立js映射文件 方便调试代码
  devtool: 'source-map',
  // webpack-cli
  // watch: true,
  devServer: {
    static: '../public',
    // 是否热更新
    hot: true,
    // 这里能修改端口 和本地服务
    // host: '0.0.0.0',
    port: 7777,
    // 自动打开浏览器
    open: true,
    // 是否压缩静态资源   bundle.js
    compress: true,
    // 域名代理
    // 用于本地解决跨域问题
    // 在本地服务器与当前域名不同时， 请求数据会出现跨域问题， 这时候就需要代理
    // Proxy: {
    //   '/api': {
    //     // 这里会将域名换成target的内容
    //     target: 'http://localhost:8888',
    //     // 用于跨域时多出来的一个'api'
    //     // 重写为空
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
  },

  resolve: {
    // 自动添加拓展名
    extensions: ['.js', '.json', '.mjs', '.vue'],
    // 别名--方便访问路经
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'js': path.resolve(__dirname, 'src/js')
    }
  },
  // 入口
  entry: './src/main.js',
  // 出口的位置
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'build'),
    // 这里可以写下asset-module-type的generator配置
    // assetModuleFilename: 'img/[name]_[hash:6][ext]
  },
  plugins: [
    // 运行打包时 删除原来output的内容
    new CleanWebpackPlugin(),
    // 自动生成一个html的文件
    new HtmlWebpackPlugin({
      template: './public/index.html',   //可以给一个模版
      title: '我是标题'
    }),
    // new webpack.DefinePlugin({

    // }),
    new VueLoaderPlugin()
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
      // {
      //   test: /\.sass$/,
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //     'sass-loader']
      // },
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
      },
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       // plugins: [

      //       //   // 将es6代码转化成es5
      //       //   // npm install -D @babel/plugin-transform-arrow-functions
      //       //   // npm install -D @babel/plugin-transform-block-scoping
      //       //   '@babel/plugin-transform-arrow-functions',
      //       //   '@babel/plugin-transform-block-scoping'
      //       // ]
      //       plugins: {
      //         preset: [
      //           '@babel/preset-env'
      //         ]
      //       }
      //     }
      //   }
      // },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  }
}
