// 加载文章内容，只会在开发环境调用
const devUrl = '/api'
const proUrl = 'https://zh.moegirl.org.cn/api.php'
const url = process.env.NODE_ENV === 'development' ? devUrl : proUrl

export default function loadArticle(pageName: string): Promise<string> {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      data: {
        action: 'parse',
        format: 'json',
        page: pageName,
        redirects: 1,
        prop: 'text'
      }
    })
      .then(data => resolve(data.parse.text['*']))
      .catch(reject)
  })
}