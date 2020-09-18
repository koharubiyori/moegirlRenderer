import createModuleConfig from '~/utils/createModuleConfig'
import './index.scss'

const { config, watchChange } = createModuleConfig('collapsible', {
  $showButtonText: '[展开]',
  $hideButtonText: '[收起]'
})

watchChange<string>('$showButtonText', value => {
  $('.mw-collapsible.mw-collapsed .collapseButton').text(value)
})

watchChange<string>('$hideButtonText', value => {
  $('.mw-collapsible:not(.mw-collapsed) .collapseButton').text(value)
})

// 收起展开栏
export default () => {
  $('.mw-collapsible').each(function() {
    const collapseButtonText = (collapsed: boolean) => collapsed ? config.$showButtonText : config.$hideButtonText
    
    const isCollapsed = $(this).hasClass('mw-collapsed')
    const collapseButton = $('<div class="collapseButton">')
      .text(collapseButtonText(isCollapsed))
      .on('click', () => {
        $(this).toggleClass('mw-collapsed')
        collapseButton.text(collapseButtonText($(this).hasClass('mw-collapsed')))
      })
    
    $(this).find('> tbody > tr > th').eq(0).append(collapseButton)
  })
}