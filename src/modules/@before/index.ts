import addCategories from './modules/addCategories'
import addCopyright from './modules/addCopyright'
import nightTheme from './modules/nightTheme' // 夜晚模式，放在第一个加载保证速度，防止出现可见的白变黑

export default function before() {
  [
    nightTheme, // 黑夜模式，必须保证最先执行，否则容易出现肉眼可见的主题切换
    addCategories, 
    addCopyright
  ].forEach(item => item())
}