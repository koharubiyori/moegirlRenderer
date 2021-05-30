interface Window {
  $: JQueryStatic
  moegirl: Moegirl
  RLQ: Function[]
}

type I18nText = string | __MoegirlConfig.I18n['text']

declare interface Moegirl {
  init(): void
  readonly initialized: boolean
  data: {
    // 可以设置data里的字段，一些模块会根据这里的数据做判断
    pageName?: string
    language?: string
  }
  method: {
    // 一些模块会向外提供方法
    link: {
      gotoAnchor(anchorName: string, offset?: number): void
    }
    poll: {
      updatePollContent(pollId: string, content: string): void
    }
  }
  config: {
    // 在此声明配置的类型并添加注释，可响应属性使用$开头
    heimu: {
      $enabled: boolean // 开启黑幕，默认true
      $useTransition: boolean // 使用过渡，默认true
    }

    link: {
      onClick(payload: { type: keyof __MoegirlConfig.Link['dataMaps'], data: any }): void // 点击链接的回调函数
    }

    collapsible: {
      $showButtonText: I18nText // 展开按钮文字
      $hideButtonText: I18nText // 隐藏按钮文字
    }

    biliPlayer: {
      texts: {
        loading: I18nText
        removed: I18nText
        netErr: I18nText
      }
      onClick(payload: __MoegirlConfig.BiliPlayer['videoData']): void
      onLongPress(payload: __MoegirlConfig.BiliPlayer['videoData']): void
    }

    nightTheme: {
      $enabled: boolean
    }

    // 功能性模块
    request: {  // 注入一个请求器，用于跨域请求
      callbacks: {  // 保存所有回调，用于将响应的数据传回webView
        [callbackId: number]: {
          resolve(value: any): void
          reject(value: any): void
        }
      }

      // 向外部传请求数据，会包含一个callbackId，用这个id在callbacks上调用回调
      onRequested(requestData: __MoegirlConfig.Request['requestData']): void 
    }

    vibrate: {  // 振动控制器
      onCalled(): void
    }

    // 在页面底部添加版权信息
    addCopyright: {
      enabled: boolean
      content: I18nText
    }

    // 在页面底部添加分类
    addCategories: {
      categories: string[]  // 分类数据
      text: I18nText  // 分类文字的国际化
    }

    // 宿主滚动模式，取消webview中的滚动，并提供一个内容高度变化时的监听函数
    hostScrollMode: {
      enabled: boolean
      onResize(height: number): void
    }

    // 数据收集器，通过分析dom传回数据
    dataCollector: {
      contentsData(data: __MoegirlConfig.DataSelector['contentData'][]): void
    }

    // 投票
    poll: {
      onPoll(payload: __MoegirlConfig.Poll['pollData']): void
    }
  }
}

declare const moegirl: Moegirl