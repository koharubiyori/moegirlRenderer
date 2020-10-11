import createModuleConfig from '~/utils/createModuleConfig'
import './index.scss'

const { config } = createModuleConfig('pageHeightObserver', {
  enabled: false,
  onResize: () => {}
})

// 页面高度观察者
export default () => {
  if (!config.enabled) { return }
  const container = $('.mw-parser-output')
  config.onResize(container.height()!)
  container.css('position', 'relative')
  
  const iframe = $('<iframe class="pageHeightObserver">')
  $('.mw-parser-output').append(iframe)

  const iframeWindow = (iframe.get(0) as HTMLIFrameElement).contentWindow!
  $(iframeWindow).on('resize', () => config.onResize(container.height()!))
}