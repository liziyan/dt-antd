import React from 'react';
import {Link} from 'react-router-dom';
import { Breadcrumb } from 'antd';
/**
 * @describe：面包屑导航，样式沿用ant-design的样式
 * @author : 雏田
 * @time: 2018-08-02
 * 数据格式：
 * const breadMenu = [{
      path: '',
      title: '卡管理'
    }, {
      path: 'cardType',
      title: '卡类型列表'
    }, {
      path: '',
      title: '新增卡类型'
    }]; 
 */
export default class SiderDemo extends React.Component {
  render() {
     const routes = this.props.menu;
    return (
      <Breadcrumb className='breadcrumb'>
      {
        routes.map((route, index) => {
          return !route.path ?
          <Breadcrumb.Item key={index}><span>{route.title}</span></Breadcrumb.Item> :
          <Breadcrumb.Item key={index}><Link to={`/${route.path}`}>{route.title}</Link></Breadcrumb.Item>
        })
      }       
      </Breadcrumb>
    )   
  }
}