import createModuleConfig from '~/utils/createModuleConfig'
import qs from 'qs'

export interface LinkDataMaps {
  article: {
    pageName: string
    displayTitle: string
    author: string
  }
  img: {
    name: string
    thumbnailUrl: string
  }
  note: {
    id: string
  }
  author: {
    id: string
  }
  notExist: {
    pageName: string
  }

  edit: {
    pageName: string
    section: 'new' | number
  }
  notExistEdit: {
    pageName: string
  }
  watch: {
    pageName: string
  }
  external: {
    url: string
  }
  unparsed: {
    [key: string]: string
  }
}

const moegirlDomainRegex = /^https:\/\/zh\.moegirl\.org\.cn/

const { config, watchChange } = createModuleConfig('link', {
  onClick: () => {}
})

// 链接处理
export default () => {
  const triggerOnClick = <T extends keyof LinkDataMaps>(type: T, data: LinkDataMaps[T]) => config.onClick({ type, data })
  
  $('a').on('click', function(e) {
    e.preventDefault()
    let link = ($(e.target).attr('href') || $(e.target).parent('a').attr('href') || $(this).attr('href'))!
    link = decodeURIComponent(link)
    
    // 判断是否为萌百内链
    if (moegirlDomainRegex.test(link) || ['/', '#'].includes(link[0])) {
      link = link.replace(moegirlDomainRegex, '')
      
      // 判断是请求index.php的链接还是条目名的链接
      if (!/^\/index\.php\?/.test(link)) {
        const [pageName, author] = link.replace(/^\//, '').split('#')

        // 图片
        if (/^File:/.test(pageName)) {
         return triggerOnClick('img', { 
            name: pageName.replace(/^File:/, ''),
            thumbnailUrl: ($(e.target).attr('src') || $(this).find('img').eq(0).attr('src'))!,
          })
        }

        if (pageName === '' && /^cite_note-/.test(author)) {
          return triggerOnClick('note', { id: author })
        }

        if (pageName === '' && author) {
          return triggerOnClick('author', { id: author })
        }

        if ($(this).hasClass('new')) {
          return triggerOnClick('notExist', { pageName: link })
        }

        // 条目
        let displayTitle = (
          $(e.target).attr('title') || 
          $(e.target).find('> img').eq(0).attr('alt') ||
          $(e.target).parent('a').attr('title') || 
          $(this).attr('title') ||
          $(this).find('> img').eq(0).attr('alt')
        )!
        return triggerOnClick('article', { pageName, displayTitle, author })
      } else {
        const params: any = qs.parse(link.replace(/^\/index\.php\?/, ''))

        // 编辑页
        if (params.action === 'edit') {
          if ($(this).hasClass('new')) {
            return triggerOnClick('notExistEdit', { pageName: params.title })
          }
          
          return triggerOnClick('edit', {
            pageName: params.title,
            section: /^\d+$/.test(params.section) ? parseInt(params.section) : params.section,
          })
        }

        // 添加到监视列表
        if (params.action === 'watch') {
          return triggerOnClick('watch', { pageName: params.title })
        }

        return triggerOnClick('unparsed', params)
      }
    } else {
      triggerOnClick('external', { url: link })
    }
  })
}