import I18nText from './i18nText'

// 创建模块配置
export interface ModuleConfig<ModuleName extends keyof Moegirl['config']> {
  config: Moegirl['config'][ModuleName]
  watchChange<T = any>(propPath: string, handler: (value: T) => void): void
  addMethod<
    ModuleName extends keyof Moegirl['method'], 
    _MethodName extends keyof Moegirl['method'][ModuleName] = keyof Moegirl['method'][ModuleName]
  >(
    methodName: _MethodName, 
    fn: Moegirl['method'][ModuleName][_MethodName]
  ): void
}

export default function createModuleConfig<T extends keyof Moegirl['config']>(moduleName: T, initialConfig: Moegirl['config'][T]): ModuleConfig<T> {
  type ModuleName = T
  if (!window.moegirl) window.moegirl = {} as any
  if (!window.moegirl!.config) window.moegirl!.config = {} as any

  const propertyProxyHandlers: { [propPath: string]: (value: any) => void } = {}

  const configProxy: typeof initialConfig = (function makeProxy(config: any, parentNames: (string | number)[]) {
    Object.keys(config).forEach(item => {
      if ([null, undefined].includes(config[item])) { return }
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
      },

      
      get(target, prop) {
        // 适配国际化
        const value = target[prop]
        if (value instanceof I18nText) {
          return (value.textMaps as any)[moegirl.data.language || 'zh-hans']
        }

        return value
      }
    })
  })(initialConfig, [])

  const watchChange: ModuleConfig<ModuleName>['watchChange'] = (propPath, handler) => propertyProxyHandlers[propPath as any] = handler
  const addMethod: ModuleConfig<ModuleName>['addMethod'] = (methodName, fn) => {
    if (!window.moegirl.method) window.moegirl.method = {} as any
    if (!(window.moegirl.method as any)[moduleName]) (window.moegirl.method as any)[moduleName] = {} as any
    ;(window.moegirl.method as any)[moduleName][methodName] = fn
  }

  window.moegirl!.config[moduleName] = configProxy
  return { 
    config: configProxy,
    watchChange,
    addMethod
  }
}