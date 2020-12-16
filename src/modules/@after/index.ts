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


  $(':root').css('--max-content-width', $('.mw-parser-output').width()! + 'px')
  // 发现在手机端有获取到0px的情况，这里做个延时再赋值
  setTimeout(() => {
    $(':root').css('--max-content-width', $('.mw-parser-output').width()! + 'px') // 添加一个最大内容宽度变量
  }, 3000)
}