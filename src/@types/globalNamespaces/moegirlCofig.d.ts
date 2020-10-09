import { BiliVideoData } from '~/modules/biliPlayer'
import { LinkDataMaps } from '~/modules/@after/modules/link'
import { RequestData } from '~/modules/_request'


export = MoegirlConfig

export as namespace __MoegirlConfig

declare namespace MoegirlConfig {
  interface Link {
    dataMaps: LinkDataMaps
  }

  interface BiliPlayer {
    videoData: BiliVideoData
  }

  interface Request {
    requestData: RequestData
  }
}
