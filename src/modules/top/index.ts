import setCssColorByComputedColor from '~/utils/setCssColorByComputedColor'
import './index.scss'

// 置顶模板
export default () => {
  // 给infoBox设置三个border-left颜色的变量(r,g,b)，用作背景颜色
  $('.infoBox').each(function () {
    setCssColorByComputedColor(getComputedStyle(this).borderLeftColor, 'borderLeftColor', this)
  })
}