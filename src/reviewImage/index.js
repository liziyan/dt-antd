/**
 * @title: 查看详情中有图片时，点击图片可查看大图
 * @author: 雏田
 * @version: 1.0.0
 * @time: 2018-10-10
 * @param {[string]}   [picUrl]   [要展示的大图的图片路径]
 * @param {[function]} [onCancel] [关掉大图的回调函数]
  * 调用方法：
  import ReviewImage from '@/components/reviewImage/index';
  {showModal &&
    <ReviewImage
      picUrl={ModalImg}
      onCancel={()=>{
        this.setState({showModal: false})
      }}
    />
  }
 */
import React from 'react';
import {  
  Modal,
} from 'antd';
import './index.less';

export default class TableDrawer extends React.Component {
  state = {
    width: 520, // modal的宽度
    height: 'auto', // modal的高度   
  }  
  /**
   * [componentDidMount 加载render方法之前,获取所有用户列表]
   * @return {[type]} [description]
   */
  componentDidMount() {
    const {picUrl} = this.props; 
    let that = this;   
    let imgtemp = new Image();
    imgtemp.src = picUrl;
    imgtemp.onload = (event)=>{
      let w = event.target.width; // 图片真实高度
      let h = event.target.height; // 图片真实宽度
      let _w = document.body.offsetWidth - 200; // 屏幕宽度
      let _h = document.body.offsetHeight - 200; // 屏幕高度
      let width = (w >= _w ? _w : w) + 80;
      let height = (h >= _h ? _h : h) + 80;
      let style = h >= _h ? '' : 'flex';
      that.setState({
        width: width > 520 ? width : 520,
        height: height > 440 ? height : 440,
        style,
      });
    }
  }  
  render() {
    const {
      onCancel,
      picUrl
    } = this.props;
    const {width, height, style} = this.state;    
    return (
      <Modal
        className={`modal ${style}`}        
        visible={true}
        centered={true}
        footer={null}
        width={width}
        height={height}
        onCancel={onCancel}
      >
        <img src={picUrl} alt='' />
      </Modal>
    )    
  }
}