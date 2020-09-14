const path = require('path')

module.exports = [
  {
    test: /\.(js|ts)$/,
    loader: 'babel-loader',
    include: path.resolve(__dirname, '../src')
  },
  
  {
    test: /\.(c|sc)ss$/,
    include: path.resolve(__dirname, '../src'),
    use: [
      'style-loader',
      'css-loader', 
      'sass-loader', 
      {
        loader: 'postcss-loader',
        options: {
          plugins: () => [
            require('autoprefixer') // 添加默认前缀
          ]
        }
      },
      {
        loader: 'sass-resources-loader',
        options: {
          resources: path.resolve(__dirname, '../src/styles/utils.scss')
        }
      }
    ]
  },
]