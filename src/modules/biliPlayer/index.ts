import createModuleConfig from '~/utils/createModuleConfig'
import Hammer from 'hammerjs'
import './index.scss'
import vibrate from '../_vibrate'
import request from '../_request'
import I18nText from '~/utils/i18nText'

export interface BiliVideoData {
  type: 'av' | 'bv'
  videoId: string
  page: number
}

const { config } = createModuleConfig('biliPlayer', {
  texts: {
    loading: new I18nText({ 'zh-hans': '标题获取中', 'zh-hant': '標題獲取中' }),
    removed: new I18nText({ 'zh-hans': '视频又挂了', 'zh-hant': '影片又掛了' }),
    netErr: new I18nText({ 'zh-hans': '标题获取失败', 'zh-hant': '標題獲取失敗' })
  },
  onClick: () => {},
  onLongPress: () => {}
})

// b站播放器
export default () => {
  $('.wikitable.bilibili-video-container').each(function () {
    let videoId = $(this).data('id').toString()
    const page = $(this).data('page')

    const isAvId = /^([aA][vV]|)\d+$/.test(videoId)
    videoId = videoId.replace(/^([aA][vV]|[bB][vV])/, '')

    const playerButton = $(`<div class="bilibili-video-title">${config.texts.loading}</div>`)
    playerButton.on('click', () => config.onClick({ type: isAvId ? 'av' : 'bv', videoId, page }))
    new Hammer(playerButton.get(0)).on('press', () => {
      vibrate()
      config.onLongPress({ type: isAvId ? 'av' : 'bv', videoId, page })
    })

    const title = $(this).data('title')
    if (title) {
      playerButton.text(title)
    } else {
      request({
        method: 'get',
        url: 'https://api.bilibili.com/x/web-interface/view',
        data: { 
          [isAvId ? 'aid' : 'bvid']: videoId 
        },
      })
        .then(res => {
          if (res.code !== 0) {
            playerButton.text((res.code === -404 ? config.texts.removed : config.texts.netErr) as string)
          } else {
            playerButton.text(res.data.title)
          }
        })
        .catch(e => {
          console.log(e)
          playerButton.text(config.texts.netErr as string)
        })
    }

    $(this)
      .removeClass('wikitable bilibili-video-container')
      .addClass('biliPlayerButton')
      .empty()
      .append(playerButton)
  })
}