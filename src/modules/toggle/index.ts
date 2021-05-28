import './index.scss'

// toggle模板
export default () => {
  $('div[id^="mw-customcollapsible-"]').hide(0)
  
  $('div[class^="mw-customtoggle-"]').on('click', function() {
    const targetId = 'mw-customcollapsible-' + $(this).attr('class')!.match(/^mw-customtoggle-(.+)$/)![1]
    const targetEl = $('#' + targetId)
    targetEl.hasClass('mw-collapsed') ? targetEl.slideUp(300) : targetEl.slideDown(300)
    $('#' + targetId).toggleClass('mw-collapsed')
  })
}