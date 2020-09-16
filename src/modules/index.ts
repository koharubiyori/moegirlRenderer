const requireCtx = (require as any).context('.', true, /index\.[tj]s/)
const modules: Function[] = requireCtx.keys()
  .filter((key: string) => key !== './index.ts')  // 排除自己
  .map((key: string) => requireCtx(key).default)

// 这里再进行一些零碎的操作
modules.push(() => {
  $('#toc').remove()  // 移除目录  
  $(':root').css('--max-content-width', $('.mw-parser-output').width()! + 'px') // 添加一个最大内容宽度变量
})

export default modules