import createModuleConfig from '~/utils/createModuleConfig'
import './index.scss'

const { config } = createModuleConfig('addCopyright', {
  enabled: true,
  content: '本站全部内容禁止商业使用。文本内容除另有声明外，均在<a href="https://creativecommons.org/licenses/by-nc-sa/3.0/deed.zh">知识共享 署名-非商业性使用-相同方式共享 3.0 (CC BY-NC-SA 3.0)</a> 许可协议下提供，附加条款亦可能应用，详细信息参见<a href="/萌娘百科:版权信息">萌娘百科:版权信息</a>。其他类型作品版权归属原作者，如有授权遵照授权协议使用。'
})

// 添加版权协议
export default function addCopyright() {
  if (moegirl.data.pageName === 'Mainpage') { return }
  if (!config.enabled) { return }
  
  $('body').append(`
    <div class="copyright">
      <div class="divider"></div>
      <p>${config.content}</p>
    </div>
  `)
}