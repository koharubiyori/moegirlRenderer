import createModuleConfig from '~/utils/createModuleConfig'
import I18nText from '~/utils/i18nText'
import './index.scss'

const { config } = createModuleConfig('addCategories', {
  categories: [],
  text: new I18nText({ 'zh-hans': '分类', 'zh-hant': '分類' })
})

// 添加分类
export default function addCategories() {
  if (config.categories.length == 0) { return }
  
  let title = $(`<h2>${config.text}</h2>`)
  let categories = $('<p>').html(
    config.categories.map(categoryName => `
      <a href="/${config.text}:${categoryName}">
        <div class="categoryBox">${categoryName}</div>
      </a>
    `).join('')
  )
  
  $('.mw-parser-output').append(title, categories)
}