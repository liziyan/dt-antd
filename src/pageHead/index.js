import React from 'react';
import { Tabs } from 'antd';
import Breadcrumb from '../breadcrumb/index';
import './index.less';
const { TabPane } = Tabs;
/**
 * @describe:页面通用头部。含：面包屑，标题，和简单说明
 * @auther: 雏田
 * @time: 2018-08-02
 * nav: 面包屑导航，详细代码看@/components/breadcrumb/index，传入的数据格式：
 * const breadMenu = [{
 *   path: 'index', // 路由路径。不想跳转则为空。
 *   title: '首页' // 显示文字
 * }]
 * title: 基本样式的文字。
 * logo: 前置图片地址
 * action: 与title同一行的右侧按钮配置项，自己定义好传过来，这里只做展示
 * content：基本样式的详细说明。也可以改写为自己想要的样子，直接传过来只做展示
 * extraContent： 自定义右侧样式。定义好之后直接传过来，这里只做展示
 * tabList: 卡片下的tab切换，数据格式：
 * const tabList = [{
 *   key: 'detail',
 *   tab: '详情',
 * }, {
 *   key: 'rule',
 *   tab: '规则',
 * },]
 * tabDefaultActiveKey: // 默认激活的tab面板的key
 * tabActiveKey: // 当前激活 tab 面板的 key
 * tabBarExtraContent: //tab bar 上额外的元素
 * onTabChange: tab切换的回到函数
 */
export default class PageHead extends React.Component {
  render() {    
    const {
      nav,
      title,
      logo,
      action,
      content,
      extraContent,
      tabList,
      tabDefaultActiveKey,
      tabActiveKey,
      tabBarExtraContent,
      onTabChange,
    } = this.props;
    const activeKeyProps = {};
    if (tabDefaultActiveKey !== undefined) {
      activeKeyProps.defaultActiveKey = tabDefaultActiveKey;
    }
    if (tabActiveKey !== undefined) {
      activeKeyProps.activeKey = tabActiveKey;
    }   
    return (
      <div className='pageHeader'>        
       {nav && <Breadcrumb menu={nav} />}
        <div className='detail'>
          {logo && <div className='logo'>{logo}</div>}
          <div className='main'>
            <div className='row'>
              {title && <h1 className='title'>{title}</h1>}
              {action && <div className='action'>{action}</div>}
            </div>
            <div className='row'>
              {content && <div className='content'>{content}</div>}
              {extraContent && <div className='extraContent'>{extraContent}</div>}
            </div>
          </div>
        </div>
        {tabList &&
          tabList.length && (
            <Tabs
              className='tabs'
              {...activeKeyProps}
              onChange={(key) => {                
                if (onTabChange) {
                  onTabChange(key);
                }
              }}
              tabBarExtraContent={tabBarExtraContent}
            >
              {tabList.map(item => <TabPane tab={item.tab} key={item.key} />)}
            </Tabs>
          )}
      </div>
    );
  }
}



