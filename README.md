# dt-antd
> 数据智能改变公共出行的产品二部基于antdesign开发的后台公共组件。仅适用于公交云产品二部三个平台。


## 目录

- [代码说明](#代码说明)
- [组件说明]
  - [PageLayout](#PageLayout)
  - [BodyLayout](#BodyLayout)
- [公用方法说明]
- [发布](#发布)
- [使用](#使用)
- [关于](#关于)

## 代码说明

**启动**

clone此代码，然后执行yarn命令进行安装。之后即可对其进行编译
```js
yarn
```
**目录说明**

```
lib               // 编辑后的文件
|
node_modules      // 依赖包
|
src               // 源文件
|
other
├── .babelrc      // Babel设置
├── index.js      // 文件入口
└── package.json  // 设置
```
### lib --- Babel

为了把 ES6 代码编译成 ES5，需要安装 Babel，这个工具可以说野心极大，一次编译可以让 JavaScript 运行在所有地方。（听起来是不是有点 Java 的作风）

目前最常用的是 Babel5 版本，但是 Babel6 版本的设计更为精巧，已经非常推荐更新。也正是由于 Babel 有两个版本，所以开发过程中很有可能遇到这样的情况，
模块 A 的开发依赖于 Babel5 版本，而模块 B 依赖于 Babel6 版本。

*解决这个问题最好的做法就是把 A 和 B 拆开，独立开发和发布。并且在发布到 NPM 的时候发布是的编译后的，也就是 ES5 版本的代码。*

所以如果你的机器上的 `babel` 是全局安装的，是时候卸载它了，因为它的版本不是 5 就是 6 ，会导致一些不可预见的问题。

`npm uninstall babel-cli --global`

正确的安装方式是把 babel-cli 作为 development 依赖

`npm install babel-cli --save-dev`

使用的时候并不是直接调用全局的 `babel` 而是调用依赖里的 `babel` 可执行文件

`./node_modules/.bin/babel`

使用Babel之后会将src里面的代码编译成ES5并输出到lib相应的目录中

### package.json --- 命令详解

具体解释一下各个命令的作用：

第一条命令 `./node_modules/.bin/rimraf lib`

**作用** 编译前清空之前的 lib 目录，这是一个好习惯，可以杜绝对 lib 下的文件的任何手动更改。

第二条命令

`./node_modules/.bin/babel src --out-dir lib --source-maps --extensions .es6,.es,.jsx --copy-files  `

**作用** 遍历 src 目录下的文件，如果后缀名是 .es/.es6/.jsx 中的一种，就编译成 ES5，否则就直接拷贝到输出目录 lib 下

参数详解:

`--out-dir lib` 指定输出目录为 lib

`--extensions .es6,.es,.jsx` 指定需要编译的文件类型

`--copy-files` 对于不需要编译的文件直接拷贝

`--source-maps` 生成 souce-map 文件

### .babelrc 文件

编译过程中还隐含了一个步骤就是加载 `.babelrc` 文件里的配置，该文件内容如下

```json
{
  "presets": [
    "es2015",
    "stage-0",
    "react"
  ]
}
```

这是因为 Babel6 采用了插件化的设计，做到了灵活配置：如果要转换 JSX 语法文件，就加上 React 的 preset，同时项目依赖里要添加
`babel-preset-react`

```sh
npm install babel-preset-react --save-dev
```

## PageLayout

整体框架组件，结构：左上下模式，左边分title和菜单，上边分左(收起展开按钮)和右(登陆员信息)

调用方法:

```js
import {PageLayout} from 'dt-antd';

const path = {
  siderMenu: {
    logo,
    title,
    menu,
  },
  pageHead: {
    user: {
      userName,
      userPhoto,
      logOut,
      userChange,
      userItem,
    },
    other,
  }
}

<PageLayout {...path}>
  // 中间部分的内容
</PageLayout>
```
**path参数说明**

参数名 | 子参数 | 三级参数 | 描述 | 类型 | 是否必填
----|----|----|------|----|----
siderMenu | | | 框架左边的内容  | object | 是
 | logo | | logo图片 | string |  否(默认为公交云logo)
 | title | | 左侧头部文字 | string |  是
 | menu | | 左侧菜单(详情见下面表格) | object |  是
pageHead | | | 框架上面的内容  | object | 是
 | user | | 最右侧用户头像+用户名+下拉部分的参数 | object |  是 
 | | userName | 用户名 | string |  是(如果启用了userChange则选填) 
 | | userPhoto | 用户头像 | string |  否(默认ant头像) 
 | | logOut | 退出登陆方法 | func |  是(如果启用了userChange则选填) 
 | | userChange | 不满足用户名+头像模式的自定义书写 | object | 否
 | | userItem | 不满足只有退出登陆的下拉菜单模式而自定义书写 | object | 否
 | other | | 头部右边默认只有一个头像+用户名，要加其它东西在这里自定义书写，会累加 | object |  否 

**左侧菜单menu说明文档**

左侧菜单栏为了兼容主数据已定的返回模式，如果返回格式不一致，请对数据重新处理为以下格式：

```js
let menu = [{
    code: 'userManage',
    name: '用户管理',
    icon: 'user',
    subMenus: [{
      code: 'userManage.userManage',
      name: '用户列表',
      url: '/userManage'
    }]
  }];
```

参数说明：

参数名 | 子参数 | 描述 | 类型 | 是否必填
----|----|------|----|----
code | | 识别的主键，不能重复 | string | 是
name | | 标题 | string | 是
icon | | 图标 | string | 是
subMenus | | 二级菜单目录 | object | 是
| code | 识别的主键，不能重复 | string | 是
| name | 标题 | string | 是
| url | 访问的路由路径，为了兼容主数据，要有/ | string | 是


另外为了方便页面指向左侧菜单的选中和展开，在定义页面其它路由时,如新增编辑详情等，页面路由定义格式为：
{对应父级的path[也就是菜单栏menu中的url字段]}/你要定义的路由(如新增add，编辑edit/:id,详情detail/:id等)

## BodyLayout

面包屑以及头部调用方法，分头部，面包屑，页面标题，children正文，版本四个部分。

调用方法:

```js
import {BodyLayout} from 'dt-antd';

const breadMenu = [{
  path: '',
  title: '供应商管理'
}, {
  path: 'cardManage/cardTypeList',
  title: '二级供应商',
}, {
  path: '',
  title: '车辆管理'
}]

const tabList = [{
  key: 0,
  tab: '配置信息',
},{
   key: 1,
   tab: '页面地址',
},{
   key: 2,
   tab: '充值信息',
},{
   key: 3,
   tab: '协议内容',
}]

<BodyLayout
  nav={breadMenu}
  title='车辆管理列表'
  content='二级供应商下所有的车辆'
  logo='https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
  action='按钮'
  extraContent='右侧展示内容'
  tabList={tabList}
  tabDefaultActiveKey='0'
  tabActiveKey='0'
  tabBarExtraContent='额外元素'
  onTabChange={(tabsKey) => {...})
  copyright='公交云版权所有'
  top='头部显示的类容'
>
  // 中间部分的内容
</BodyLayout>
```
**path参数说明**

参数名 | 描述 | 类型 | 是否必填 | 备注
----|----------|----|----|---------------
nav | 面包屑 | array | 否 | 格式见上代码的breadMenu定义格式
title| 页面标题 | string | 否 | 展示效果可见：https://preview.pro.ant.design/dashboard/workplace
content | 标题下的副标题 | string | 否 | 展示效果可见：https://preview.pro.ant.design/dashboard/workplace
logo | 需要图片时展示 | string | 否 |  展示效果可见：https://preview.pro.ant.design/dashboard/workplace
action | 右侧需要按钮丛时预留 | object| 否 | 展示效果可见：https://preview.pro.ant.design/profile/advanced
extraContent | 右侧额外显示信息 | object | 否 | 展示效果可见： https://preview.pro.ant.design/profile/advanced
tabList | tab切换选项 | array | 否 | 格式见上代码的tabList定义格式，展示效果可见https://preview.pro.ant.design/profile/advanced
tabDefaultActiveKey | tab默认选中的key | string | 否 | 默认第一个
tabActiveKey | tab选中的key | string | 否 | 默认第一个
onTabChange | tab点击之后的回调方法 | function | 否 | 返回参数为对应的key
copyright | 页面版权信息 | object | 否 |
top | 头部内容 | object | 否 |


## 发布

发布前，还有一件事就是为你的模块添加一个入口文件 `index.js`，全部指向编译后的代码

```
export { default as MyComponent } from './lib/MyComponent';
export { default as PageLayout } from './lib/SiderMenu/index';
export { default as BodyLayout } from './lib/pageHeaderLayout/index';
...
```

接下来就可以发布到 NPM 了。

```sh
npm publish
```
首次发布需要输入用户名密码描述等，教程可百度。之后每次发布只需要publish即可。

**注意：每次发布时，package.json里的版本号version都要变更，不能与以往提交的代码冲突，否则会导致发布不成功，切记！**

## 使用

可以直接通过 NPM 安装

```sh
npm install dt-antd --save-dev
```

然后在父级项目的代码里导入模块

```js
import MyComponent,{PageLayout,BodyLayout} from 'dt-antd'
```

此时导入的直接是 ES5 代码，跳过了组件的编译过程从而避免了出现组件 Babel 版本和父级项目 Babel 版本不一致的问题，并且速度更快，是不是很棒！

### 使用源码

如果只想用其中的一个或某几个，这时可以这样导入：

```
import MyComponent from 'react-component-example/src/MyComponent.jsx'
```

这种情况下，导入的是 ES6 代码，并且会被加入父级项目的编译过程。此外，父级项目在编译这个文件的时候会读取组件的 .babelrc 配置文件。

### 如何后续开发

clone此源码到本地，起初尝试时请修改package.json的name，改一个自定义的名字如vivy-learn，发布后npm install vivy-learn，并import组件引入，确认每个组件都能正常引用后，再将name改回dt-antd，并提交到git。


## 关于

**本文使用的 babel 版本**

`./node_modules/.bin/babel --version` 6.4.5 (babel-core 6.4.5)

**LICENSE**

MIT

