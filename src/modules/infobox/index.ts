import setCssColorByComputedColor from '~/utils/setCssColorByComputedColor'
import './index.scss'

// 右侧信息模板
export default () => {
  $('.infobox').each(function() {
    // 设置主题色css变量
    const headerEl = $(this).find('tbody > tr:first > td:first').get(0)
    setCssColorByComputedColor(getComputedStyle(headerEl).backgroundColor, 'headerColor', this)

    // 清除空行
    $(this).find('tbody > tr > td:has(div[style="clear:both;"])').remove()
  })
}