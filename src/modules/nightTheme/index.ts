import createModuleConfig from '~/utils/createModuleConfig'

const { config, watchChange } = createModuleConfig('nightTheme', {
  $enabled: false
})

watchChange<boolean>('$enabled', value => {
  toggleStyle(value)
})

function toggleStyle(enable: boolean) {
  const styleTag = $('style:contains("nightThemeStyleTagMark")').eq(0)
  styleTag.attr('type', enable ? 'text/css' : 'text/plain') // 给style标签设置type="text/plain"会使样式失效
}

// 夜晚模式样式
export default () => {
  require('./index.scss')
  toggleStyle(config.$enabled)
}