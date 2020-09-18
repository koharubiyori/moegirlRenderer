import createModuleConfig from '~/utils/createModuleConfig'

export interface RequestParams {
  url: string
  method: 'get' | 'post'
  data: any
}

export interface RequestData extends RequestParams {
  callbackId: number
}

const { config } = createModuleConfig('request', {
  callbacks: {},
  onRequested: () => {}
})

let callbackIncrementId = 0

export default function request(params: RequestParams): Promise<any> {
  return new Promise((resolve, reject) => {
    const callbackId = callbackIncrementId++
    config.callbacks[callbackId] = { resolve, reject }
    config.onRequested({ ...params, callbackId })
  })
}