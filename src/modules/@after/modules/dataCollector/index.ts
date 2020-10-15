import createModuleConfig from '~/utils/createModuleConfig'

const { config } = createModuleConfig('dataCollector', {
  contentsData: null as any
})

export interface ContentData {
  level: number
  id: string
  name: string
}

// 页面数据收集器
export default function dataCollector() {
  if (config.contentsData !== null) {
    const contentData = $('.mw-headline').toArray()
      .map(el => ({
        level: parseInt($(el).parent('h1, h2, h3, h4, h5, h6').get(0).tagName[1]),
        id: $(el).attr('id')!,
        name: $(el).text()
      }))

    config.contentsData(contentData)
  }
}