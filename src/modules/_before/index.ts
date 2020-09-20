import addCategories from '../_addCategories'
import addCopyright from '../_addCopyright'

export default function before() {
  [addCategories, addCopyright].forEach(item => item())
}