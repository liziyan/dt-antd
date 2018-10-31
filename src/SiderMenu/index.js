import React from 'react';
import { is, fromJS } from 'immutable';
import { Layout, Icon, } from 'antd';
import 'antd/dist/antd.css';
import './index.less';
import HeadLogo from './logo';
import NavMenu from './menu';
import RightContent from './right';
/**
 * 整体框架组件，结构：左上下模式，左边分title和菜单，上边分左(收起展开按钮)和右(登陆员信息)
 * @author: 雏田
 * @time: 2018-09-18
 * 调用方法：
 * import {PageLayout} from 'DT-antd';
 * const path = {
 *   children,    // 【必填】 框架的中间部分 
 *   siderMenu: { // 【必填】 框架的左边部分
 *     logo,      // 【选填】 左侧头部logo，默认为公交云logo
 *     title,     // 【必填】 左侧头部文字
 *     menu,      // 【必填】 左侧菜单栏数据，有固定格式，固定格式见最上面组件说明
 *   },
 *   pageHead: {      // 【必填】 顶部分的参数       
 *     user: {        // 【必填】 最右侧用户头像+用户名+下拉部分的参数（如果启用了userChange则选填）
 *       userName,    // 【必填】 用户名（如果启用了userChange则选填）
 *       userPhoto,   // 【选填】 用户头像
 *       logOut,      // 【必填】 退出登陆的回调方法，下拉菜单默认只有一个退出登陆（如果启用了userItem则选填）
 *       userChange,  // 【选填】 object,不满足用户名+头像模式的自定义书写
 *       userItem,    // 【选填】 object，不满足只有退出登陆的下拉  菜单模式而自定义书写
 *     },
 *     other, // 【选填】 头部右边默认只有一个头像+用户名，要加其它东西在这里自定义书写，会累加
 *   },
 *   theme: {  // 主题
 *     navTheme: 'light', // 主题颜色，白色light和深色dark，默认dark
 *     isTop: true, // 导航是否显示在头部,默认显示在左边
 *   }, 
 * }
 * <PageLayout {...path} />
 *
 * 其中左侧菜单栏为了兼容主数据已定的返回模式，如果返回格式不一致，请对数据重新处理为以下格式：
 * let menu = [{
 *    code: 'userManage', // 识别的主键，不能重复
 *    name: '用户管理', // 标题
 *    icon: 'user', // 图标
 *    subMenus: [{ // 二级菜单目录
 *      code: 'userManage.userManage', // 一级主键.二级主键
 *      name: '用户列表', // 标题
 *      url: '/userManage' // 访问的路由路径，为了兼容主数据，要有/
 *    }]
 *  }];
 *
 * 另外为了方便页面指向左侧菜单的选中和展开，在定义页面其它路由时,如新增编辑详情等，页面路由定义格式为：
 * {对应父级的path[也就是菜单栏menu中的url字段]}/你要定义的路由(如新增add，编辑edit/:id,详情detail/:id等)
 */
const { Header, Sider, Content } = Layout;
export default class SiderDemo extends React.Component {
  state = {
    collapsed: false, // 左侧是否缩小
    path: null, // 当前路由    
    menu: null,
    openKeys: '', // 展开的key
    selectedKeys: '', // 选中的Key
    maxWidth: undefined, // isTop时导航的最大宽度
  };  
  /**
   * [点击展开或缩小左侧的事件]
   * @return {[type]} [description]
   */
  toggle = () => {   
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  static getDerivedStateFromProps(props) {
    return {
      maxWidth: (props.contentWidth === 'Fixed' ? 1200 : window.innerWidth) - 280 - 165 - 40,
    };
  }
  /**
   * [shouldComponentUpdate 如果state值没有改变时就算调用了setState方法，页面也不会重新渲染]
   * @param  {[type]} nextProps [description]
   * @param  {[type]} nextState [description]
   * @return {[type]}           [description]
   */
  shouldComponentUpdate(nextProps, nextState) {
    if(!is(fromJS(this.props), fromJS(nextProps)) && !(nextProps.theme && nextProps.theme.isTop)) {
      this.getUrl(nextProps.siderMenu.menu);
    }    
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
  }
  /**
   * [componentDidMount 加载render方法之前]
   * @return {[type]} [description]
   */
  componentDidMount(){
    let that = this;   
    this.getPageChange();
    window.onresize = function(){
      that.getPageChange();
    };
  }
  /**
   * [获取窗体的改变]
   * @return {[type]} [description]
   */
  getPageChange=()=>{
    let width = document.body.offsetWidth;
    if(width > 1366 && this.state.collapsed) {
      this.setState({
        collapsed: false
      })
    } else if(width <= 1366 && !this.state.collapsed) {
      this.setState({
        collapsed: true
      })
    }
  }
  /**
   * [getUrl 获取当前url的路由地址，常用于浏览器返回箭之后的左侧菜单选中效果]
   * 说明：
   * 目前框架是按照主数据的返回菜单来定义的，主数据的菜单格式请看mockdata里的模拟数据格式
   * 菜单选中方式获取步骤如下：
   * 1. 获取url的路由path
   * 2. 和menu做比较，得到url字段中含有path的code来选中左侧效果
   * 3. 获得最外层的code来展开一级目录。
   *
   * 所以，在定义路由时，要按照数据库返回的数据格式来定义。比如：
   * 1. 用户列表的路由为：/userManage
   * 2. 那他对应下的详情则应该为：/userManage/detail/:id
   * 3. 对应下的新增则应该为：/userManage/add
   *
   * 只有这样定义，才能保证左侧菜单的展开和选中是一一对应的
   */
  getUrl(menu){    
    // 获取当前路由
    let path = window.location.href.split('#')[1];    
    if(!path || path === '/') return;
    // 根据path获取menu对应的item    
    let openKeys; // 展开的一级key   
    let selectedKeys; // 选中的二级key
    menu && menu.filter(item=>{     
      item.subMenus && item.subMenus.filter(val=>{ 
        if(path.indexOf(val.url) > -1){
          openKeys = item.code; 
          selectedKeys = val.code;
        }     
        return val;
      });
      return item;
    });    
    this.setState({
      openKeys,
      selectedKeys
    });
  }
  handleOpen(openKeys) {
    this.setState({
      openKeys: openKeys[openKeys.length - 1],
    })
  }
  /**
   * [render description]
   * @return {[type]} [description]
   */
  render() {
    let {
      children, // 框架的中间部分（必填） 
      siderMenu: { // 框架的左边部分
        logo, // 左侧头部logo，默认为公交云logo
        title,// 左侧头部文字（必填）
        menu, // 左侧菜单栏数据，有固定格式，固定格式见最上面组件说明（必填）
      },
      pageHead: { // 顶部分的参数       
        user: { // 最右侧用户头像+用户名+下拉部分的参数
          userName, // 用户名(必填)
          userPhoto, // 用户头像
          logOut, // 退出登陆的回调方法(必填)，下拉菜单默认只有一个退出登陆
          userChange, // object,不满足用户名+头像模式的自定义书写
          userItem, // object，不满足只有退出登陆的下拉菜单模式而自定义书写
        },
        other, // 头部右边默认只有一个头像+用户名，要加其它东西在这里自定义书写，会累加
      },     
      theme, // 主题
    } = this.props; 
    theme = theme || {};
    const isTop = theme && theme.isTop || false;
    const {path, selectedKeys, collapsed, openKeys, maxWidth} = this.state;   
    // 如果初始或者切换时是隐藏模式，则不选中当前选中的key
    const menuProps = collapsed ? {} : {openKeys: [openKeys]};
    const headerWidth = collapsed ? 80 : 256;   
    return isTop ? (
      <Layout style={{height: '100%'}}>
        <div className={`head ${theme.navTheme === 'light' ? 'light' : 'dark'} layoutHeader`}>
        <div         
          className={`main`}
        >
          <div className='left'>
            <HeadLogo {...{logo, title, isTop, theme}} />
            <div
             style={{maxWidth}}
            >
              <NavMenu {...{selectedKeys, menuProps, menu, path, isTop, theme, handleOpen: this.handleOpen.bind(this)}} />
            </div>
          </div>          
          <RightContent {...{other, userItem, userChange, userPhoto, userName, logOut, theme}} />
        </div>
      </div>
      <Content style={{
        background: '#f5f5f5',
        minHeight: 280,
        paddingTop: 64,
      }}>
        {children}
      </Content>
      </Layout>
    ) : (
      <Layout style={{height: '100%'}}>
        <Sider
          trigger={null}
          collapsible
          width={256}
          collapsed={collapsed}
          className={`navSider fixSiderbar scroll ${theme.navTheme}`}
        >
          <HeadLogo {...{logo, title, isTop, theme}} />
          <NavMenu {...{selectedKeys, menuProps, menu, path, isTop, theme, handleOpen: this.handleOpen.bind(this)}} />
        </Sider>
        <Layout>
          <Header className="layoutHeader" style={{
            background: '#fff',
            padding: '0 12px 0 0',
            width: `calc(100% - ${headerWidth}px)`,
            left: `${headerWidth}px`, 
          }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <RightContent {...{other, userItem, userChange, userPhoto, userName, logOut, theme}} />
          </Header>
          <Content style={{background: '#f5f5f5', minHeight: 280, paddingLeft: `${headerWidth}px`, paddingTop: 64}}>
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}