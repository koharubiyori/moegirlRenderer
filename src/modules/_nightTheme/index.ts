import './index.scss'
import createModuleConfig from '~/utils/createModuleConfig'

const { config, watchChange } = createModuleConfig('nightTheme', {
  $enabled: false
})

watchChange<boolean>('$enabled', value => {
  toggleStyle(value)
})

function toggleStyle(enable: boolean) {
  $('body')[enable ? 'addClass' : 'removeClass']('nightTheme')
}

// 夜晚模式样式
export default function nightTheme() {
  toggleStyle(config.$enabled)
}