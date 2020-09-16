import './index.scss'

// 图片处理
export default () => {
  const maxWidth = $('.mw-parser-output').width()! - 10
  
  $('.thumb > .thumbinner').css('width', '')
  $('.image > img').each(function() {
    if (parseInt($(this).attr('width')!) > maxWidth) {
      $(this).attr({ width: maxWidth + 'px', height: '' })
    }
  })
}