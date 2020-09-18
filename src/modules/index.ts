import after from './_after'
import before from './_before'

const requireCtx = (require as any).context('.', true, /index\.[tj]s/)
const modules: Function[] = requireCtx.keys()
  .filter((key: string) => /^\.\/[^_].+?\/index\.[tj]s$/.test(key))
  .map((key: string) => requireCtx(key).default)

modules.unshift(before)
modules.push(after)

export default modules