interface Window {
  $: JQueryStatic
  moegirl: Moegirl
}

declare interface Moegirl {
  init(): void
  readonly initialized: boolean
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
      $showButtonText: string // 展开按钮文字
      $hideButtonText: string // 隐藏按钮文字
    }

    biliPlayer: {
      texts: {
        loading: string
        removed: string
        netErr: string
      }
      onClick(payload: __MoegirlConfig.BiliPlayer['videoData']): void
      onLongPress(payload: __MoegirlConfig.BiliPlayer['videoData']): void
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
      content: string
    }

    // 在页面底部添加分类
    addCategories: {
      categories: string[]  // 分类数据
      text: string  // 分类文字的国际化
    }
  }
}

declare const moegirl: Moegirl