import { LinkDataMaps } from '~/modules/link'

export = MoegirlConfig

export as namespace __MoegirlConfig

declare namespace MoegirlConfig {
  interface Link {
    dataMaps: LinkDataMaps
  }
}
