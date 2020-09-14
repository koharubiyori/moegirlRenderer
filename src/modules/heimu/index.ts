import './index.scss'
import createModuleConfig from '~/utils/createModuleConfig'

const { config, watchChange } = createModuleConfig('heimu', {
  $enabled: true,
  $useTransition: true
})

watchChange<boolean>('$enabled', value => {
  if (value) {
    $('.heimu').removeClass('heimu-show').off('click')
    render()
  } else {
    $('.heimu').addClass('heimu-show').off('click')
  }
})

watchChange<boolean>('$useTransition', value => {
  $('.heimu')[value ? 'addClass' : 'removeClass']('heimu-useTransition')
})

function render() {
  console.log(config)
  if (config.$enabled) {  
    if (config.$useTransition) $('.heimu').addClass('heimu-useTransition')
    
    $('.heimu').one('click', function(e) {
      $(this).addClass('heimu-show')
      if ($(this).find('a')) {
        e.preventDefault()
        e.stopPropagation()
      }
    })
  } else {
    $('.heimu').addClass('heimu-show')
  }
}

export default render