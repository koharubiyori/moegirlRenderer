import './index.scss'

// 维基表格
export default () => {
  $('table').wrap('<div class="tableWrapper">')

  $('.wikitable').each(function() {
    // tr大于两个说明使用了可折叠表格，而不是hide模板。 <-- 用dom结构来判断要怎么显示，没有比这个更蛋疼的了
    if ($(this).find('> tbody > tr').length > 2) $(this).addClass('wikitable-collapsible')
  })
}