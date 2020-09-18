import './index.scss'

// 标签栏
export default () => {
  $('.Tabs').each((index, tabs) => {
    const activeBgColor = tabs.dataset.labelBackgroundColor
    activeBgColor && $(tabs).css('--activeBgColor', activeBgColor)
    
    const tabLabels = $(tabs).find('> .Tab > .TabLabelText')
    const tabContents = $(tabs).find('> .Tab > .TabContentText')
    $(tabs).empty()
    const tabLabelContainer = $('<div class="TabLabelContainer">').append(tabLabels)
    const tabContentContainer = $('<div class="TabContentContainer">').append(tabContents)
    $(tabs).append(tabLabelContainer, tabContentContainer)

    tabLabelContainer.find('> .TabLabelText').on('click', function(e) {
      $(tabLabelContainer).find('> .TabLabelText').removeClass('Tabs-active')
      $(this).addClass('Tabs-active')
      tabContentContainer.find('> .TabContentText')
        .removeClass('Tabs-active')
        .eq($(this).index())
        .addClass('Tabs-active')
    })
    tabLabelContainer.find('> .TabLabelText').eq(0).trigger('click')
  })
}