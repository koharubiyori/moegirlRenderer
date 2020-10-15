import createModuleConfig from '~/utils/createModuleConfig'
import './index.scss'

const { config } = createModuleConfig('hostScrollMode', {
  enabled: false,
  onResize: null as any
})

// 页面高度观察者
export default () => {
  if (!config.enabled) { return }
  $('body').addClass('hostScrollMode')
  
  if (config.onResize === null) { return }
  const iframe = $('<iframe class="pageHeightObserver">')
  $('.mw-parser-output').append(iframe)

  const iframeWindow = (iframe.get(0) as HTMLIFrameElement).contentWindow!
  $(iframeWindow).on('resize', () => config.onResize($('html').height()!))
  setTimeout(() => config.onResize($('html').height()!))
}