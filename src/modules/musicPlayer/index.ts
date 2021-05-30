import './index.scss'
import bandcamp from './bandcamp'
import appleMusic from './appleMusic'
import spotify from './spotify'
import music163 from './music163'

// 第三方播放器
export default () => {
  music163()
  appleMusic()
  bandcamp()
  spotify()
}