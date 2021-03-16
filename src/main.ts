import './globalLibs'
import './styles/index.scss'
import loadArticle from './utils/loadArticle'
import config from '../config.js'
import modules from './modules'

window.moegirl = {
  ...window.moegirl,
  data: {},
  initialized: false,
  init: () => {
    modules.forEach(item => item())
    ;(window.moegirl as any).initialized = true
    console.log('moegirlRenderer:initialized')

    window.RLQ = [] // 有的页面会包含脚本，向RLQ这个全局变量push函数，为了push时防止报错，添加这个
  }
}

;(async () => {
  if (process.env.NODE_ENV === 'development') {
    const articleName = location.search.replace(/^\?/, '') || 'Mainpage'
    const articleHtml = await loadArticle(decodeURIComponent(articleName))

    // 萌百的共享站有盗链检测，这里全部走代理，去掉referer
    const commonUrlRegex = /https:\/\/img\.moegirl\.org\.cn\/common\//g
    const replaceToProxyUrl = (url: string) => url.replace(commonUrlRegex, `http://localhost:${config.devServerPort}/common/`)
    $('body').get(0).innerHTML += articleHtml
    $('body')
      .find('img, source').each(function() {
        const src = $(this).attr('src') || ''
        const srcset = $(this).attr('srcset') || ''
        if (![commonUrlRegex.test(src), commonUrlRegex.test(srcset)].includes(true)) { return }
        $(this)
          .attr('src', replaceToProxyUrl(src))
          .attr('srcset', replaceToProxyUrl(srcset))
      })

    moegirl.config.link.onClick = (payload) => location.href = `http://localhost:8900?${payload.data.pageName}`
    // moegirl.config.request.onRequested = (data) => console.log('req', data)
    // moegirl.config.hostScrollMode.enabled = true
    moegirl.config.dataCollector.contentsData = console.log
    moegirl.config.hostScrollMode.enabled = true
    moegirl.config.hostScrollMode.onResize = console.log
    // moegirl.config.nightTheme.$enabled = true
    moegirl.init()
  }
})()