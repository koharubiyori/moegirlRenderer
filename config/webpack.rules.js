const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = [
  {
    test: /\.(js|ts)$/,
    loader: 'babel-loader',
    include: path.resolve(__dirname, '../src')
  },
  
  {
    test: /\.(c|sc)ss$/,
    // include: path.resolve(__dirname, '../src'),
    use: [
      process.env.NODE_ENV === 'development' ? 
        'style-loader' 
      :
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            // 热更新时报错，暂时这样吧
            // hmr: process.env.NODE_ENV === 'development',  // 开启热更新
            // reloadAll: true // 如果 hmr 不工作, 请开启强制选项
          }
        },
      'css-loader', 
      {
        loader: 'postcss-loader',
        options: {
          plugins: () => [
            require('autoprefixer') // 添加默认前缀
          ]
        }
      },
      'sass-loader',
      {
        loader: 'sass-resources-loader',
        options: {
          resources: path.resolve(__dirname, '../src/styles/utils.scss')
        }
      }
    ]
  },
]