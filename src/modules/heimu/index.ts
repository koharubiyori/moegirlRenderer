import './index.scss'
import createModuleConfig from '~/utils/createModuleConfig'

const { config, watchChange } = createModuleConfig('heimu', {
  $enabled: true,
  $useTransition: true
})

watchChange<boolean>('$enabled', value => {
  if (value) {
    $('.heimu').removeClass('heimu-show')
    render()
  } else {
    $('.heimu').addClass('heimu-show')
  }
})

watchChange<boolean>('$useTransition', value => {
  $('.heimu')[value ? 'addClass' : 'removeClass']('heimu-useTransition')
})

function render() {
  if (config.$enabled) {  
    if (config.$useTransition) $('.heimu').addClass('heimu-useTransition')
    
    $('.heimu').each(function() {
      this.addEventListener('click', e => {
        if ($(this).find('a') && !$(this).hasClass('heimu-show')) {
          e.preventDefault()
          e.stopPropagation()
        }
        $(this).addClass('heimu-show')
      }, true)
    })
  } else {
    $('.heimu').addClass('heimu-show')
  }
}

export default render