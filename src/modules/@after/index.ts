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

  $(':root').css('--max-content-width', $('.mw-parser-output').width()! + 'px')
  // 发现在手机端有获取到0px的情况，这里做个延时再赋值
  setTimeout(() => {
    $(':root').css('--max-content-width', $('.mw-parser-output').width()! + 'px') // 添加一个最大内容宽度变量
  }, 3000)
}