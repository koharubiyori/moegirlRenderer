const requireCtx = (require as any).context('.', true, /index\.[tj]s/)
const modules: Function[] = requireCtx.keys()
  .filter((key: string) => key !== './index.ts')  // 排除自己
  .map((key: string) => requireCtx(key).default)

// 这里再进行一些零碎的操作
modules.push(() => {
  $('#toc').remove()  // 移除目录  
})

export default modules