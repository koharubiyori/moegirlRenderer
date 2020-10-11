import after from './@after'
import before from './@before'

const requireCtx = (require as any).context('.', true, /index\.[tj]s/)
const modules: Function[] = requireCtx.keys()
  // 排除：以下划线开头、at开头、非二级目录、不是index的文件
  .filter((key: string) => /^\.\/[^_@][^\/]+?\/index\.[tj]s$/.test(key))
  .map((key: string) => requireCtx(key).default)

console.log(modules)
modules.unshift(before)
modules.push(after)

export default modules