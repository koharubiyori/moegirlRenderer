import './globalLibs'
import './styles/index.scss'
import loadArticle from './utils/loadArticle'
import config from '../config.js'
import modules from './modules'

window.moegirl = {
  config: window.moegirl.config, 
  initialized: false,
  init: () => {
    modules.forEach(item => item())
    ;(window.moegirl as any).initialized = true
    console.log('moegirlRenderer:initialized')
  }
}

;(async () => {
  if (process.env.NODE_ENV === 'development') {
    const articleName = location.search.replace(/^\?/, '') || '点兔'
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

    moegirl.config.link.onClick = console.log
    moegirl.config.addCategories.categories = ['aaa', 'vvv']
    moegirl.init()
  }
})()