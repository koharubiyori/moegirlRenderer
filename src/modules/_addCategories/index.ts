import createModuleConfig from '~/utils/createModuleConfig'
import './index.scss'

const { config } = createModuleConfig('addCategories', {
  categories: [],
  text: '分类'
})

// 添加分类
export default function addCategories() {
  let title = $(`<h2>${config.text}</h2>`)
  console.log(config)
  let categories = $('<p>').html(
    config.categories.map(categoryName => `
      <a href="/${config.text}:${categoryName}">
        <div class="categoryBox">${categoryName}</div>
      </a>
    `).join('')
  )
  
  $('body').append(title, categories)
}