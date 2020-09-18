import createModuleConfig from '~/utils/createModuleConfig'

const { config } = createModuleConfig('vibrate', {
  onCalled: () => {}
})

export default function vibrate() {
  config.onCalled()
}