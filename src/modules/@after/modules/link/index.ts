import './index.scss'
import createModuleConfig from '~/utils/createModuleConfig'
import qs from 'qs'
import animateScrollTo from 'animated-scroll-to'

export interface LinkDataMaps {
  article: {
    pageName: string
    displayTitle: string
    anchor: string
  }
  img: {
    name: string
    thumbnailUrl: string
  }
  gallery: {
    imageFileNames: string[]
    clickedIndex: number
  }
  note: {
    id: string
    html: string
  }
  anchor: {
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
  externalImg: {
    url: string
  }
  unparsed: {
    [key: string]: string
  }
}

const moegirlDomainRegex = /^https:\/\/zh\.moegirl\.org\.cn/

const { config, addMethod } = createModuleConfig('link', {
  onClick: () => {}
})

addMethod('gotoAnchor', (anchorName: string, offset = 0) => {
  animateScrollTo($(document.getElementById(anchorName)!).offset()!.top + offset, {
    maxDuration: 400
  })
})

// 链接处理
export default function link() {
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
        const [pageName, anchor] = link.replace(/^\//, '').split('#')

        // 图片
        if (/^File:/.test(pageName)) {
          // 判断是否为画廊
          const isInGallery = $(this).parents('.gallery')
          if (isInGallery.length !== 0) {
            const gallery = isInGallery.eq(0)
            const galleryImages: string[] = []
            gallery.find('.image').each((index, item) => {
              console.log(item)
              const imageFileName = $(item).attr('href')!.replace(/^\/File:/, '') 
              galleryImages.push(decodeURIComponent(imageFileName))
            })

            const clickedImageName = pageName.replace(/^File:/, '')
            const clickedIndex = galleryImages.findIndex(item => item === clickedImageName)
            
            return triggerOnClick('gallery', { 
              imageFileNames: galleryImages,
              clickedIndex
            })
          }

          return triggerOnClick('img', { 
            name: pageName.replace(/^File:/, ''),
            thumbnailUrl: ($(e.target).attr('src') || $(this).find('img').eq(0).attr('src'))!,
          })
        }

        if (pageName === '' && /^cite_note-/.test(anchor)) {
          const html = $('#' + anchor).find('.reference-text').html()
          return triggerOnClick('note', { id: anchor, html })
        }

        if (pageName === '' && anchor) {
          return triggerOnClick('anchor', { id: anchor })
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
        return triggerOnClick('article', { pageName, displayTitle, anchor })
      } else {
        const params: any = qs.parse(link.replace(/^\/index\.php\?/, ''))

        // 编辑页
        if (params.action === 'edit') {
          if ($(this).hasClass('new')) {
            return triggerOnClick('notExist', { pageName: params.title })
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

  // 给外链图片添加点击显示大图
  $('img:not([data-file-width][data-file-height])').on('click', function() {
    triggerOnClick('externalImg', { url: $(this).attr('src')! })
  })
}