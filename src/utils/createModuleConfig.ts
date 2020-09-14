// 创建模块配置
export interface ModuleConfig<T> {
  config: T
  watchChange<T = any>(propPath: string, handler: (value: T) => void): void
}

export default function createModuleConfig<T extends keyof Moegirl['config']>(moduleName: T, initialConfig: Moegirl['config'][T]): ModuleConfig<typeof initialConfig> {
  if (!window.moegirl) window.moegirl = {} as any
  if (!window.moegirl!.config) window.moegirl!.config = {} as any

  const propertyProxyHandlers: { [propPath: string]: (value: any) => void } = {}

  const configProxy: typeof initialConfig = (function makeProxy(config: any, parentNames: (string | number)[]) {
    Object.keys(config).forEach(item => {
      if ([Object, Array].includes(config[item].constructor)) {
        config[item] = makeProxy(config[item], parentNames.concat([item]))
      }
    })
    
    return new Proxy(config, {
      set(target, prop, value) {
        let needExecHandler = window.moegirl && window.moegirl.initialized && !Object.is(target[prop], value)
        
        target[prop] = value

        if (needExecHandler) {
          const propPath = parentNames.concat([prop as any]).join('.')
          propertyProxyHandlers[propPath] && propertyProxyHandlers[propPath](value)
        }

        return true
      }
    })
  })(initialConfig, [])

  const watchChange = <T = any>(propPath: string, handler: (value: T) => void) => propertyProxyHandlers[propPath as any] = handler

  window.moegirl!.config[moduleName] = configProxy
  return { 
    config: configProxy,
    watchChange
  }
}