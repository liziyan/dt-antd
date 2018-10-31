/**
 * @title: 表格中点击详情弹出右侧显示详情的组件。只考虑当前情况，有新需求继续往下加
 * @author: 雏田
 * @version: 1.0.0
 * @time: 2018-08-16
 * @param {[string]}   [title]   [副标题,可不填]
 * @param {[array]}    [children] [展示的内容]
 * 传入的数据格式:
 * const data = [{
    title: '基本信息',
    children: [{
      title: '姓名', // label
      content: 'string类型', // 显示的文字
      col: 24, // 占比，24表示一行，12表示50%
    }, {
      title: '头像',
      picUrl: '图片url', // 显示图片
      col: 24, 
    }, {
      title: '博客',
      linkUrl: '链接地址', // 显示链接
      col: 24, 
    }, {
      title: '标签',
      tags: ['网购达人','运动健儿','00后'], // 显示标签
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
  * 调用方法：
  * import {DrawerDetail} from '../tableDrawer/index';
  * {data && <Detail data={data} />}
 */
import React from 'react';
import {
  Row,
  Col,
  Tag,
  Divider,
} from 'antd';
import ReviewImage from '../reviewImage/index';
import './index.less';

export default class TableDrawer extends React.Component { 
  state={
    showModal: false,
    ModalImg: null,
  }
  render() {
    const {
      data, // 显示的数值
    } = this.props; 
    const {showModal, ModalImg} = this.state; 
    return (<div>
      {
        data && data.map((item,index)=> {
          return(<div key={index}>
            { 
              !!item.title && index!==0 && <div><Divider /><p className='pStyle'>{item.title}</p></div>
            }
            {
              !!item.title && index === 0 && <p className='pStyle'>{item.title}</p>
            }
            <Row>
              {
                item.children.map((value, _index)=>{
                  return (<Col span={value.col} key={_index}>
                    <div className='tableDetailTile'>
                       <p>{value.title}{value.title && ':' }</p>
                      {
                        value.content && value.content
                      }
                      <Row>
                        {
                          value.picUrl && <img className="pic" src={value.picUrl} onClick={(e)=>{                            
                            this.setState({
                              showModal: true,
                              ModalImg: value.picUrl,
                            })
                          }} alt=''/>
                        }
                      </Row>

                      {
                        value.linkUrl && <a href={value.linkUrl} target="_blank">{value.linkUrl}</a>
                      }
                      {
                        value.tags &&
                        value.tags.map((item, index) => {
                          return (<Tag key={index}>{item}</Tag>)
                        })
                      }                    
                    </div>                    
                  </Col>)
                })
              }
            </Row>
          </div>)          
        })
      }
      {showModal &&
        <ReviewImage
          picUrl={ModalImg}
          onCancel={()=>{
            this.setState({showModal: false})
          }}
        />
      }
    </div>)    
  }
}