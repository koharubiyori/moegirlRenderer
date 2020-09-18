## MoegirlMobileRenderer

该项目为[萌娘百科](https://zh.moegirl.org.cn/Mainpage)的移动端渲染器，用于开发萌百移动客户端时解决条目渲染的问题。

## 使用

``` html
<script src="main.js"></script>
<script>
moegirl.init()
</script>
```

可以进行配置，初始配置请在执行`moegirl.init()`之前进行。

所有配置都是可选参数，在`moegirl.config[moduleName]`上进行配置。有些选项是可响应配置(属性以`$`开头)，即执行过`moegirl.init()`后，修改配置项还会触发相应的动作。

配置请参考：[src/@types/globals.d.ts#9](https://github.com/koharubiyori/moegirlRenderer/blob/9f7275dd46dc792636b42aa44d558255f21ee427/src/%40types/globals.d.ts#L9)

**请不要对一个有子对象的配置项直接赋值一个新对象，也不要给moegirl.config赋值新对象，这将导致响应式结构被破坏。**

## 定制

该渲染器不提供扩展功能，因为大多数移动端应用环境向webView注入的js代码都很容易写错，不适合注入大段代码。请直接clone或fork本项目，添加代码后编译，也欢迎大家向该项目贡献代码。

### 开发配置

`config.js`：
- devServerPort：开发服务器运行端口
- sourceMap：是否附加行内的代码source map

使用`yarn start`启动开发服务器。
使用`yarn build`命令进行编译。该项目生成的文件服务目标为移动app端，所以只生成一个main.js文件。如果要分离样式和依赖包等请自行在`/config`文件夹下修改webpack配置。

### 添加模块

在`modules`文件夹下添加以下结构的文件夹：
```
> 模块名
  > index.ts/index.js
  > index.scss
```

不需要手动引入，框架将自动扫描modules文件夹下的二级文件夹index文件。如果模块文件夹以`_`(下划线)开头，则不会被自动引入。

`index.ts`样板：
``` ts
import './index.scss'

// 模块名(使用中文书写)
export default () => {
}

```

**模块没有执行顺序，请尽可能保证各个模块之间的独立性。**

如果你使用vscode<del>那我们就是朋友</del>，你可以通过输入`cmi`(create module index.ts)来快速创建一个模块样板。

如果你要创建一个可配置的模块，可以参考以下示例：

``` ts
import createModuleConfig from '~/utils/createModuleConfig'
import './index.scss'

// 模块名

// 创建配置后，请在@types/globals.d.ts中声明对应类型，createModuleConfig函数会关联globals.d.ts中声明的模块及其类型
const { config, watchChange } = createModuleConfig('moduleName', {
  $configItem1: true  // $只是一个标记，便于用户识别，实际上所有的属性都是可响应(监听)的 
  configItem2: false
  $configItem3: {
    $value1: 123,
    value2: 456
  }
})

// 可以对属性进行监听，当用户修改配置时，就会触发这些函数，执行过moegirl.init()后生效
watchChange<boolean>('$configItem1', value => {   // 传入泛型是可选的，如果不传value将是any类型

})

watchChange<number>('$configItem3.$value1', value => {

})

export default () => {
  if (config.configItem1) {
    // 一些操作
  }
}
```






