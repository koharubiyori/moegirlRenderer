const path = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')
const config = require('../config')

const commonProxyHeaders = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36'
}

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'source-map',

  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    publicPath:'/',
    host: 'localhost',
    port: config.devServerPort,
    overlay: true, // 浏览器页面上显示错误
    // open: true, // 开启自动打开浏览器
    // stats: 'errors-only', //stats: 'errors-only'表示只打印错误：
    hot: true, // 开启热更新
    proxy: {
      '/api': {
        target: 'https://zh.moegirl.org.cn/api.php',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        },
        headers: {
          ...commonProxyHeaders
        }
      },
      '/common': {
        target: 'https://img.moegirl.org.cn/common/',
        changeOrigin: true,
        pathRewrite: {
          '^/common': ''
        },
        headers: {
          ...commonProxyHeaders,
          Referer: ''
        }
      }
    }
  }
})