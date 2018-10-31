/**
 * @title: 表单中上传图片的公用组件，只支持上传一张，且是“困”模式的上传
 * @author: 雏田
 * @version: 1.0.0
 * @time: 2018-08-17
 * @param {[string]}      [url]           [上传的api路径]
 * @param {[string]}      [name]          [form表单中的name]
 * @param {[string]}      [imageUrl]      [默认图片,常用于编辑]
 * @param {[function]}    [uploadImage]   [上传成功的回调函数，可不填]
  * 调用方法（含formItem的图片校验方法）：
  * <FormItem {...formItemLayout} label='广告图片' extra='推荐尺寸750*150'>
      {getFieldDecorator('pic', {
        rules: [{
          validator: (rule, value, callback)=>{
            let hasPic = this.state.hasPic;
            if(!hasPic){
              callback('请上传图片');
            }
            callback();
          },                   
        }],
      })(
        <UploadImage
          url='//jsonplaceholder.typicode.com/posts/'
          name='pic'
          imageUrl={defaultValues && defaultValues.pic || ''}
          uploadImage= {(imageUrl)=>{
            this.setState({
              hasPic: imageUrl
            }) 
          }}
        />                
      )}
    </FormItem>
 */
import React from 'react';
import { 
  message,
  Icon,
  Upload,
  Modal,
} from 'antd';
import { is, fromJS } from 'immutable';

export default class TableDrawer extends React.Component {  
  state = {
    previewVisible: false, // 是否显示大图
    previewImage: '', // 大图的地址
    fileList: [], // 显示的缩略图地址
    loading: false,
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
    const {previewVisible, previewImage, fileList} = this.state;
    const {url}=this.props;   
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action={url}
          listType="picture-card"
          fileList={fileList}
          withCredentials={true}
          onSuccess={(res)=>{
            if (res.success) {
              let list=[{
                uid: -1,
                name: 'xxx.png',
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
          onChange={()=>{
            this.setState({               
              loading: true,                
            });
          }}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}>
          <img alt="example" style={{width: '100%'}} src={previewImage} />
        </Modal>
      </div>
    );
  }
}