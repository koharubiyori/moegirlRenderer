import './index.scss'

// 图片处理
export default async () => {
  const resizeObserver = new ResizeObserver(([resize]) => {
    const maxWidth = resize.contentRect.width - 10
    if (maxWidth < 0) { return }
    
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
  })

  resizeObserver.observe($('.mw-parser-output').get(0))
}