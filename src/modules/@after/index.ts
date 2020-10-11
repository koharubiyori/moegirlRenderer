import link from './modules/link'
import pageHeightObserver from './modules/pageHeightObserver'

// 置于最后的操作
export default function after() {
  ;[
    link,
    pageHeightObserver
  ].forEach(item => item())
  
  $('#toc').remove()  // 移除目录  
  $(':root').css('--max-content-width', $('.mw-parser-output').width()! + 'px') // 添加一个最大内容宽度变量
}