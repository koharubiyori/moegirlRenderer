import link from './modules/link'
import hostScrollMode from './modules/hostScrollMode'
import dataCollector from './modules/dataCollector'

// 置于最后的操作
export default function after() {
  ;[
    link,
    hostScrollMode,
    dataCollector
  ].forEach(item => item())
  
  $('#toc').remove()  // 移除目录  

  // 大部分信息模板都是带float: right样式的table，这里做个判断将其全部改为居中
  $('table')
    .filter((_, item) => 
      getComputedStyle(item).float === 'right' ||
      item.getAttribute('align') === 'right'
    )
    .css({ float: 'none', margin: '0 auto' })
    .removeAttr('align')


  const resizeObserver = new ResizeObserver(([resize]) => {
    const contentWidth = resize.contentRect.width - 10 + 'px'
    $(':root').css('--max-content-width', contentWidth)  
  })

  resizeObserver.observe($('.mw-parser-output').get(0))
}