import createModuleConfig from '~/utils/createModuleConfig'
import './index.scss'

const { config } = createModuleConfig('addCategories', {
  categories: [],
  text: '分类'
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