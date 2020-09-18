import Plyr from 'plyr'
import 'plyr/dist/plyr.css'
import './index.scss'

// 音频播放器
export default () => {
  $('.sm2-loading-stub').each(function() {
    const data = JSON.parse($(this).find('+ div[data-bind]').eq(0).attr('data-bind')!)
    const playList = data.component.params.playlist
    const audioTag = $(`
      <audio controls class="audioPlayer">
        ${playList.map((item: any) => `<source src="${item.audioFileUrl}" />`)}
      </audio>
    `)
    
    $(this).empty().append(audioTag)
    new Plyr(audioTag.get(0), {
      controls: ['play', 'progress', 'current-time']
    })
  }) 
}