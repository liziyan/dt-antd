# dt-antd
> 数据智能改变公共出行的产品二部基于antdesign开发的后台公共组件。仅适用于公交云产品二部三个平台。


## 目录

- [代码说明](#代码说明)
- [组件说明]
  - [SiderMenu-整体框架](#SiderMenu)
  - [PageHeaderLayout-头部框架](#PageHeaderLayout)
  - [ReviewImage-查看大图](#ReviewImage)  
  - [DrawerDetail-抽屉查看详情](#DrawerDetail)
  - [TableSearch - 表格上方的搜索组件](#TableSearch)
  - [StandardTable - 表格的封装组件](#StandardTable)
  - [UploadImage - 上传图片(困图模式)](#UploadImage)
  - [UploadImageAvatar - 上传图片(头像模式)](#UploadImage)
  - [UploadImageSmall - 上传图片(无图模式)](#UploadImage)
- [公用方法说明]
  - [Utils-公用的方法](#Utils)
  - [FormStyle-form表单的公用style样式](#FormStyle)
  - [TableCommon-表格的公用方法](#TableCommon)
  - [InputVerify-验证的正则表达式](#InputVerify)
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

## SiderMenu

整体框架组件，结构：左上下模式，左边分title和菜单，上边分左(收起展开按钮)和右(登陆员信息)

调用方法:

```js
import {SiderMenu} from 'dt-antd';

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

<SiderMenu {...path}>
  // 中间部分的内容
</SiderMenu>
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
theme | | | 皮肤设置 | object | 否
 | navTheme | | 框架颜色(默认为dark黑色，可选light白色) | string | 否
 | isTop | | 菜单栏是否在顶部(默认为false，可选true) | bool | 否

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

## PageHeaderLayout

面包屑以及头部调用方法，分头部，面包屑，页面标题，children正文，版本四个部分。

调用方法:

```js
import {PageHeaderLayout} from 'dt-antd';

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

<PageHeaderLayout
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
</PageHeaderLayout>
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

## ReviewImage

查看大图，利用antd-design的Modal组件，实现点击小图查看大图的功能，只有简单的显示，没有缩略图，左右滑动的功能。

调用方法:

```js
import {ReviewImage} from 'dt-antd';

{showModal &&
  <ReviewImage
    picUrl={ModalImg}
    onCancel={()=>{
      this.setState({showModal: false})
    }}
  />
}
```
**path参数说明**

参数名 | 描述 | 类型 | 是否必填 
----|----------|----|----
picUrl | 查看大图的图片地址 | string | 是
onCancel| 点击关闭的回调函数 | function | 是

## DrawerDetail

抽屉查看详情，只展示字段部分。

调用方法:

```js
import {DrawerDetail} from 'dt-antd';

const data = [{
  title: '基本信息',
  children: [{
    title: '姓名',
    content: 'string类型',
    col: 24, 
  }, {
    title: '头像',
    picUrl: '图片url',
    col: 24, 
  }, {
    title: '博客',
    linkUrl: '链接地址',
    col: 24, 
  }, {
    title: '标签',
    tags: ['网购达人','运动健儿','00后'],,
    col: 24, 
  }]
}, {
  title: '技能信息',
  children: [{
    title: '额外技能',
    content: '英语八级',
    col: 24,
  }]
}]

{data && <Detail data={data} />}
```
**path参数说明**

参数名 | 子参数 | 描述 | 类型 | 是否必填 
----|----|----------|----|----
title | | 显示的副标题 | string | 否
children| | 要显示的详情数据 | array | 是
 | title | label字段 | string | 是
 | col | 显示的占比，默认为24(占整行)，可选12(占半行)。
 | content | label对应的值，文字 | string | 和下面的参数必选其一
 | picUrl | 展示的图片url,可查看大图 | string | 
 | linkUrl | 带链接的链接地址 | string |
 | tags | 标签，用的antdesign的Tag标签 | array |

## TableSearch

抽屉查看详情，只展示字段部分。

调用方法:

```js
import {TableSearch} from 'dt-antd';

const searchMenu = {
  // 常在的选项
  open: [{
    id: 'rule',
    label: '规则编号',
    type: 'input', // input输入框
    placeholder: '请输入规则编号',
    defaultValue: '默认值',
    isRequire: true, // 是否必填        
  }, {
    id:'status',
    label: '选择时间',
    type: 'timePicker', 
    placeholder: '请输入时间',
  },{
    id: 'rule1',
    label: '选择日期范围',
    type: 'rangePicker', 
    placeholder: '请输入选择日期范围'
  }, {
    id:'status1',
    label: '使用状态',
    type: 'select', // 下拉框
    defaultValue: '', // 默认值
    option: [{
      label: '关闭',
      value: 4,
    }], 
  },],
  // 被隐藏起来的选项,如果默认全部显示，则不调用
  hidden: [{
    id: 'date',
    label: '更新日期',
    type: 'datePicker', // 日期选择器
    placeholder: '请输入更新日期',
  }],
  // 新增按钮，默认白色背景的按钮，需要更改请重写组件  
  btns:[{
    text: '导出',
    callBack: this.handleOut,
  }],
  searchCallBack: (values) => console.log(values), // 查询的回调函数
  resetCallBack: this.handleFormReset, // 重置的回调函数
  // 除查询和重置外还要加的按钮组，默认加载查询前面，如不满足，重改组件。暂时用不到，所以没做，如果需要，请再对组件进行拓展
  btns: [{
    type: 'button',
    label: '导出',
    callBack: this.handleSearch, // 回调函数
  }]
}

<TableSearch {...searchMenu} />
```
**path参数说明**

参数名 | 子参数 | 三级参数 | 描述 | 类型 | 是否必填 
----|----|----|----------|----|----
open | | | 常开的搜索选项 | array | 是
 | id | | 字段名 | string | 是
 | label | | label名 | string | 是
 | type | | 类型 | string | 是
 | | input | 输入框 | | |
 | | timePicker | 选择时间 | | |
 | | rangePicker | 选择日期 | | | 
 | | select | 下拉框 | | | 
 | option | |下拉框的选项 | array | type为select时必填
 | | label | 显示的文字 | | | 
 | | value | 对应的key | | | 
 | placeholder | | 默认提示文字 | string | 否
 | defaultValue | | 默认值 | string | 否
 | isRequire | | 是否必填，默认否 | bool | 否
hidden| | | 默认隐藏的搜索选项，点展开才出现（参数配置和open一致） | array | 否
searchCallBack| | | 搜索按钮的回调函数，返回参数values是json | function | 是
resetCallBack| | | 充值按钮的回调函数，无返回参数 | function | 是
btns| | | 默认有搜索和重置，除此之外还需要添加其它按钮再这里配置 | array | 否
 | type | | 类型，目前只支持'button' | string | 是
 | label | | 按钮上显示的文字 | string | 是
 | callBack | | 回调函数，无参数返回 | function | 是

## StandardTable

表格的封装组件，只能满足部分功能：【列表展示，全选，列固定宽度底部有横向滚动条，左侧和右侧某列固定，页脚】

调用方法:

```js
import {StandardTable} from 'dt-antd';

const data={
  list: list && list.data, // 数据
  pagination: { // 分页
    total: list ? list.rowCount : 1, // 总条数
    pageSize: pageSize, // 总页数
    current: currentNo, // 当前页码
  },
}

const columns = [{
  title: '一级供应商名称', // 表头名
  dataIndex: 'enterpriseName', // 字段名
  key: 'enterpriseName', // 字段名,不能少
  render: (text, record) => record.id, // 拓展
  width: 500, // 宽度
  fixed: 'left', // 固定侧
}]

const selectBtns = [{
  title: '批量删除',
  judgeShow: true,
  callBack: () => console.log(this.state.selectedRows)
}] 

<StandardTable            
  loading={loading}
  data={data}
  columns={columns}
  rowKey={columns => columns.id}
  onChange={(selectedRowKeys, selectedRows)=>console.log(selectedRowKeys, selectedRows)}
  noCheck={true}
  footer=footer={() =><span>实收总金额： 5元</span>}
  selectBtns={selectBtns}
  scroll={{x: 500}}
/> 
```
**path参数说明**

参数名 | 子参数 | 描述 | 类型 | 是否必填 | 备注 
----|----|----------|----|----|----------
loading | | 显示加载框 | bool | 否 | 
data | | 展示的数据 | object | 是 |
 | list | 表格数据 | array | 是 |
 | pagination | 分页设置 | object | 是 | 配置参看antdesign官网的pagination组件，https://ant.design/components/pagination-cn/
columns | | 表头设置 | array | 是 | 具体配置项看antdesign的table组件，https://ant.design/components/table-cn/
rowKey | | 每行对应的key，每行不能重复，建议用id | string或int | 是
onChange | | 表格分页状态改变之后 | function | 是 | Function(selectedRowKeys, selectedRows)
noCheck | | 是否有全选,默认为false | bool | 否 |
selectBtns | | 如果有全选，选中之后的公用操作 | object | 否 | 
 | title | 显示的文字 | string | 是 |
 | judgeShow | 是否要选中行才显示 | bool | 是 |
 | callBack | 点击的回调函数 | function | 是 | 没有返回参数，可自行去onChange里取已经勾选的值
footer | | 页脚 | function | 否 |
scroll | | 横向宽度 | object | 否 | 这个值必须等于所有列的width相加之和，具体看antdesign官网的table组件

## UploadImage

三个方法的参数是一样的，所以写在一起。

UploadImage：上传图片，困图模式（官方示例用户头像例子），官方示例：https://ant.design/components/upload-cn/
UploadImageSmall： 上传图片，官方示例图片列表样式
UploadImageAvatar： 上传图片。定制公交新增线路专用

调用方法:

```js
import {UploadImage} from 'dt-antd';

<UploadImage
  url={`${url.uploadImage}?identityType=1`}
  name='bizLicCodeAttach'
  imageUrl={detail && detail.bizLicCodeAttach}
  handleUploadImg= {(imageUrl)=>{                                       
    this.setState({
      bizLicCodeAttach: imageUrl
    }) 
  }}
/> 
```
**path参数说明**

参数名 | 描述 | 类型 | 是否必填 | 备注 
----|----------|----|----|-----
url | 上传的服务器地址 | string | 是
name | 字段名，类似id | string | 是
imageUrl | 默认图片URL | string | 否
handleUploadImg | 上传后的回调函数 | function | 是 | 返回参数为oss地址



## Utils

一些常见的公用方法，可直接重复调用。

调用方法:

```js
import {Utils} from 'dt-antd';

const date = Utils.FormatDate(1535701322000); // 2018-10-25
const name = Utils.getQueryString('name'); // 1
const price = Utils.FormatPrice(100000, true, 2, ',', '.'); // 1,000.00

```
**path参数说明**

方法名 | 参数 | 描述 | 类型 | 是否必填 | 备注 
----|----|----------|----|----|-----
getQueryString | | 获取url参数 |  |  | 如https://a.com?name=1&b=2获取name,b的值
 | name | 参数名 | string | 是 | 返回对应的值
FormatDate | | 格式化时间，时间戳转为[yyyy-MM-dd hh:mm:ss] |  |  | 
 | times | 要转化的时间戳 | int | 是 | 
 | format | 格式化后的格式 | string | 否 | 默认 yyyy-MM-dd hh:mm:ss 
FormatPrice | | 格式化金额，并加千分位 |  |  | 
 | number | 要格式化的数 | int | 是 | 
 | isMoney | 传进来的金额单位是否为分,默认为true | bool | 否 | 默认true
 | decimals | 保留几位小数 | int | 否 | 默认2
 | thousands_sep | 千分位符号 | string | 否 | 默认,
 | dec_point | 小数点符号 | string | 否 | 默认.
getTimeDistance | | 获取时间区间 |  |  | 
 | type | 获取时间区间格式，today今日，week本周,month本月，year今年 | string | 是 | 目前只有定制公交的优惠券用到

## FormStyle

用到from编辑页的formItem的样式。

调用方法:

```js
import {FormStyle} from 'dt-antd';

<FormItem {...FormStyle.editFormDrawer} label=""></FormItem>
<FormItem {...FormStyle.editFormDrawer} label=""></FormItem>
<FormItem {...FormStyle.editFormDrawer} label=""></FormItem>
<FormItem {...FormStyle.editFormDrawer} label=""></FormItem>


```
**path参数说明**

样式名 | 描述 
----|----------
editFormDrawer | 编辑时的一行显示一列的fromItemStyle
editFormDrawerSmall | 编辑时的一行显示一列的fromItemStyle，label占比只有5
formItemLayout | 新开页面的formItem样式
submitFormLayout | 提交按钮行

## TableCommon

一些常见的公用方法，可直接重复调用。

调用方法:

```js
import {TableCommon} from 'dt-antd';

handleStandardTableChange = (pagination, filtersArg, sorter) =>{
  TableCommon.tableChange({
    state: this.state,
    pagination,
    callBack: (json) => {
      console.log(json)
      this.setState(json);
      this.props.getList(json.searchList);
    }
  });    
}

handleSearch = (values) => {
    TableCommon.tableSearch({
      state: this.state,
      values,
      callBack: (json)=>{
        this.setState(json);
        this.props.getList(json.searchList);
      }
    });    
  }

```
**path参数说明**

方法名 | 参数 | 描述 | 类型 | 是否必填 
----|----|----------|----|----
tableChange | | 表格更改之后的方法，改变state重新查询 |  | 
 | state | 当前的state，searchList表示搜索条件，每个页面需一致 | object | 是 
 | callBack | 回调函数，改变state,并重新搜索 | function | 是  
 | pagination | 分页的返回参数 | object | 是 
tableSearch | | 搜索表格（搜索按钮点击） |  |  
 | state | 当前的state，searchList表示搜索条件，每个页面需一致 | object | 是
 | values | 搜索的条件，只接收最终的值 | object | 是  
 | callBack | 回调函数，改变state,并重新搜索 | function | 是  
tableSearchCustom | | 和tableSearch一样，只限定制公交项目使用 |  |  


## InputVerify

输入的验证规则，正则表达式。

调用方法:

```js
import {InputVerify} from 'dt-antd';

<FormItem {...FormStyle.editFormDrawer} label="mobile">
  {getFieldDecorator('mobile', {    
    rules: [{
      required: true, 
      whitespace: true,
      pattern: InputVerify.mobile,
      message: 'please input your mobile'
    }],
  })(
    <Input maxLength={30} placeholder="input your mobile" />
  )}
</FormItem>


```
**path参数说明**

样式名 | 描述 
----|----------
mobile | 手机号
carNo | 车牌号
IDnumber | 身份证号
passwordM | 不能输入汉字


## 发布

发布前，还有一件事就是为你的模块添加一个入口文件 `index.js`，全部指向编译后的代码

```
export { default as MyComponent } from './lib/MyComponent';
export { default as SiderMenu } from './lib/SiderMenu/index';
export { default as PageHeaderLayout } from './lib/pageHeaderLayout/index';
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
import MyComponent,{SiderMenu,PageHeaderLayout} from 'dt-antd'
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

