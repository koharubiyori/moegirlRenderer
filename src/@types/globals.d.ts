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
    request: {
      callbacks: {  // 保存所有回调，用于将响应的数据传回webView
        [callbackId: number]: {
          resolve(value: any): void
          reject(value: any): void
        }
      }

      // 向外部传请求数据，会包含一个callbackId，用这个id在callbacks上调用回调
      onRequested(requestData: __MoegirlConfig.Request['requestData']): void 
    }

    vibrate: {
      onCalled(): void
    }
  }
}

declare const moegirl: Moegirl