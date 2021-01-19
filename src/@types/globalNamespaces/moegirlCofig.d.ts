import { BiliVideoData } from '~/modules/biliPlayer'
import { LinkDataMaps } from '~/modules/@after/modules/link'
import { RequestData } from '~/modules/_request'
import { ContentData } from '~/modules/@after/modules/dataCollector'
import I18nText from '~/utils/i18nText'


export = MoegirlConfig

export as namespace __MoegirlConfig

declare namespace MoegirlConfig {
  interface I18n {
    text: I18nText
  }

  interface Link {
    dataMaps: LinkDataMaps
  }

  interface BiliPlayer {
    videoData: BiliVideoData
  }

  interface Request {
    requestData: RequestData
  }

  interface DataSelector {
    contentData: ContentData
  }
}
