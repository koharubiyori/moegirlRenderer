const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackRules = require('./webpack.rules')

const devMode = process.env.NODE_ENV === 'development'

module.exports = {
  entry: {
    main: path.resolve(__dirname, '../src/main.ts'),
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  },

  module: {
    rules: webpackRules
  },

  resolve: {
    alias: {
      '~': path.resolve(__dirname, '../src')
    },
    extensions: ['.ts', '.js', '.json'] // 如果引入时没带后缀名，则会依次尝试这里定义的后缀名
  },

  plugins: [    
    // 创建html文件
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      hash: true,
      chunks: ['vendors', 'main'],
      minify: devMode ? false : {
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: true, //折叠空白区域 也就是压缩代码
        removeAttributeQuotes: true, //去除属性引用
      }
    }),

    // 拷贝目录
    // new CopyWebpackPlugin({
    //   patterns: [{
    //     from: path.resolve(__dirname, '../src/static'),
    //     to: path.resolve(__dirname, '../dist/static')
    //   }]
    // })
  ],
}