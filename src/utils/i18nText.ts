export type I18nTextMaps = {
  [Language in 'zh-hans' | 'zh-hant']?: string
}

export default class I18nText {
  constructor(
    public textMaps: I18nTextMaps
  ) {}
}