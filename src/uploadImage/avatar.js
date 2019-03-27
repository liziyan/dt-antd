import React from 'react';
import { 
  message,
  Icon,
  Upload,
  Button,
  Avatar,
} from 'antd';
import { is, fromJS } from 'immutable';
import './style.less';

export default class TableDrawer extends React.Component {  
  state = {
    previewVisible: false, // 是否显示大图
    previewImage: '', // 大图的地址
    fileList: [], // 显示的缩略图地址
    loading: false,
    picName: 'xxx.png',
  };
  /**
   * [beforeUpload 判断上传图片]
   * @param  {[type]} file [description]
   * @return {[type]}      [description]
   */
  beforeUpload(file) {    
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片太大超过2MB啦!');
    }
    return isLt2M;
  }
  /**
   * [关闭缩略图]
   * @return {[type]} [description]
   */
  handleCancel = () => this.setState({previewVisible: false})
  /**
   * [查看大图]
   * @param  {[type]} file [description]
   */
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  /**
   * [删除照片]
   */
  handleRemove= () => {
    let fileLists=[];
    this.setState({
      fileList: fileLists,
    });
    this.props.handleUploadImg();
  }
  /**
   * [componentWillReceiveProps 子组件更新子组件]
   * @param  {[type]} nextProps [description]
   * @return {[type]}           [description]
   */
  componentWillReceiveProps(nextProps){
    if(!is(fromJS(this.props), fromJS(nextProps)) && nextProps.imageUrl && !this.state.imageUrl){ 
      let list=[{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: nextProps.imageUrl,
      }];
      this.setState({
        fileList: list,
      });  
    }
  } 
  /**
   * [shouldComponentUpdate 如果state值没有改变时就算调用了setState方法，页面也不会重新渲染]
   * @param  {[type]} nextProps [description]
   * @param  {[type]} nextState [description]
   * @return {[type]}           [description]
   */
  shouldComponentUpdate(nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
  } 
  /**
   * [render description]
   * @return {[type]} [description]
   */
  render() {
    const {previewVisible, previewImage, fileList, loading} = this.state;
    const {url, headers, data}=this.props;
    const uploadButton = (
        loading ? <Icon type="loading" /> : <Icon type="camera" />
    );
    return (
      <div className="clearfix avatar">
        <Upload
          action={url}
          listType='picture-card'
          accept='image/png,image/jpg,image/jpeg,image/bmp'
          fileList={fileList}
          withCredentials={true}          
          headers={headers}
          data={data}
          onSuccess={(res)=>{
            if (res.success) {
              let list=[{
                uid: -1,
                name: this.state.picName,
                status: 'done',
                url: res.data,
              }];
              this.setState({
                fileList: list,
                loading: false,                
              });
              this.props.handleUploadImg(res.data);
            } else {
              message.error(res.message);
            }
          }}
          onPreview={this.handlePreview}
          onRemove={this.handleRemove}
          onChange={(info)=>{
            this.setState({               
              loading: true,
              picName: info.file.name,               
            });
          }}
        >
         {fileList.length >= 1 ? null : uploadButton}
        </Upload>
      </div>
    );
  }
}