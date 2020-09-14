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
  }
}

declare const moegirl: Moegirl