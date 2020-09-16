import setCssColorByComputedColor from '~/utils/setCssColorByComputedColor'
import './index.scss'

// 大家族模板
export default () => {
  // 去除分割线tr
  $(`
    .navbox > tbody > tr > td > .mw-collapsible > tbody,
    .navbox .navbox-subgroup > tbody
  `)
    .find('> tr[style="height:2px;"], > tr[style="height:2px"]').remove()

  // 去除subgroup的查论编占位块
  $('.navbox .navbox-title div[style="float:left; width:6em;text-align:left;"]').filter((i, el) => el.innerHTML === '&nbsp;').remove()

  $(`
    .navbox > tbody > tr > td > .mw-collapsible > tbody,
    .navbox .navbox-subgroup > tbody
  `)
    .find('> tr')
    .addClass('navboxBlock')
    .each(function() {
      if ($(this).children().length === 1 && $(this).index() !== 0) {  // 如果只有一个子节点，且非第一个tr，表示这是个subgroup
        $(this).removeClass('navboxBlock').addClass('navboxSubgroup')
      }
      
      // tr下找到了th说明是navbox的标题栏，不进行处理
      if ($(this).find('> th').length) {
        $(this).removeClass('navboxBlock')
      } else {
        const bgColor = getComputedStyle($(this).find('.navbox-group').get(0)).backgroundColor
        setCssColorByComputedColor(bgColor, 'groupColor', this)

        const navboxCollapseButton = $('<div class="navboxCollapseButton">').text('+')
          .on('click', () => {
            $(this).toggleClass('navboxBlock-show')
            navboxCollapseButton.text($(this).hasClass('navboxBlock-show') ? '-' : '+')
          })
        
        $(this).find('> .navbox-group').append(navboxCollapseButton)
      }
    })
    
    // .find()
}