import './index.scss'

// 图片处理
export default async () => {
  // 整体延迟3秒，防止某些情况下宽度获取到0
  await new Promise(resolve => setTimeout(resolve, 3000))
  
  const maxWidth = $('.mw-parser-output').width()! - 10
  
  $('.thumb > .thumbinner').css('width', '')
  $('.image > img').each(function() {
    if (parseInt($(this).attr('width')!) > maxWidth) {
      $(this).attr({ height: '' }).css('width', maxWidth)
    }
  })

  $('.thumb')
    .filter((index, item) => $(item).find('.thumbcaption').text().trim() === '')
    .addClass('thumb-noNote')

  // 干掉gallery默认样式
  $('ul.gallery *').each(function () {
    $(this).removeAttr('style')
  })
}