import addCategories from './modules/addCategories'
import addCopyright from './modules/addCopyright'
import nightTheme from './modules/nightTheme'

export default function before() {
  [
    nightTheme, // 夜晚模式，放在第一个加载保证速度，防止出现可见的白变黑
    addCategories, 
    addCopyright
  ].forEach(item => item())
}