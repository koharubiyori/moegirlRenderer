import createModuleConfig from '~/utils/createModuleConfig'
import Hammer from 'hammerjs'
import './index.scss'
import vibrate from '../_vibrate'
import request from '../_request'

export interface BiliVideoData {
  videoId: string
  page: number
}

const { config } = createModuleConfig('biliPlayer', {
  texts: {
    loading: '标题获取中',
    removed: '视频又挂了',
    netErr: '标题获取失败'
  },
  onClick: () => {},
  onLongPress: () => {}
})

// b站播放器
export default () => {
  $('.wikitable.bilibili-video-container').each(function () {
    const videoId = $(this).data('id').toString().replace('av', '')
    const page = $(this).data('page')

    const playerButton = $(`<div class="bilibili-video-title">${config.texts.loading}</div>`)
    playerButton.on('click', () => config.onClick({ videoId, page }))
    new Hammer(playerButton.get(0)).on('press', () => {
      vibrate()
      config.onLongPress({ videoId, page })
    })

    const title = $(this).data('title')
    if (title) {
      playerButton.text(title)
    } else {
      request({
        method: 'get',
        url: 'https://api.bilibili.com/x/web-interface/view',
        data: { aid: videoId },
      })
        .then(data => {
          const res = data.data
          if (res.code !== 0) {
            playerButton.text(res.code === -404 ? config.texts.removed : config.texts.netErr)
          } else {
            playerButton.text(res.data.title)
          }
        })
    }

    $(this)
      .removeClass('wikitable bilibili-video-container')
      .addClass('biliPlayerButton')
      .empty()
      .append(playerButton)
  })
}