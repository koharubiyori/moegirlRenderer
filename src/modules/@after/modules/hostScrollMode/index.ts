import createModuleConfig from '~/utils/createModuleConfig'

const { config } = createModuleConfig('hostScrollMode', {
  enabled: false,
  onResize: null as any
})

// 页面高度观察者
export default () => {
  if (!config.enabled) { return }
  const resizeObserver = new ResizeObserver(([resize]) => {
    config.onResize && config.onResize(resize.contentRect.height)
  })

  resizeObserver.observe($('html').get(0))
}