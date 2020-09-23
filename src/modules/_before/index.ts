import addCategories from '../_addCategories'
import addCopyright from '../_addCopyright'
import nightTheme from '../_nightTheme' // 夜晚模式，放在第一个加载保证速度，防止出现可见的白变黑

export default function before() {
  [nightTheme, addCategories, addCopyright].forEach(item => item())
}