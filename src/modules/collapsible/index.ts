import createModuleConfig from '~/utils/createModuleConfig'
import I18nText from '~/utils/i18nText'
import './index.scss'

const { config, watchChange } = createModuleConfig('collapsible', {
  $showButtonText: new I18nText({ 'zh-hans': '[展开]', 'zh-hant': '[展開]' }),
  $hideButtonText: new I18nText({ 'zh-hans': '[收起]', 'zh-hant': '[收起]' })
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
    const collapseButtonText = (collapsed: boolean) => (collapsed ? config.$showButtonText : config.$hideButtonText) as string
    
    const isCollapsed = $(this).hasClass('mw-collapsed')
    const collapseButton = $('<div class="collapseButton">')
      .text(collapseButtonText(isCollapsed))
      .on('click', () => {
        $(this).toggleClass('mw-collapsed')
        collapseButton.text(collapseButtonText($(this).hasClass('mw-collapsed')))
      })
    
    $(this).find('> tbody > tr > th, > tbody > tr > td').eq(0).append(collapseButton)
  })
}