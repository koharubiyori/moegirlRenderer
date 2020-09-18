import './index.scss'

// 维基表格
export default () => {
  $('.wikitable:not(.bilibili-video-container)').wrap('<div class="wikitableWrapper">')
}