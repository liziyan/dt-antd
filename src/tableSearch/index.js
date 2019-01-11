/**
 * @title: 表格上方的搜索组件
 * @author: 雏田
 * @version: 1.0.1
 * @time: 2018-08-01
 * @updateTime: 2018-08-20 新增timePicker和rangePicker by 雏田
 * @updateTime: 2018-08-27 新增input标签的isRequire必填字段 by 雏田
 * @updateTime: 2018-09-06 新增btns更多的按钮 by 雏田
 * 传入的数据格式:
 * const searchMenu = {      
      // 常在的选项
      open: [{
        id: 'rule',
        label: '规则编号',
        type: 'input', // input输入框
        placeholder: '请输入规则编号',
        defaultValue: '默认值',
        isRequire: true, // 必填 
        other:{}, // 一些其它的属性       
      }, {
        id:'status',
        label: '选择时间',
        type: 'timePicker', 
        placeholder: '请输入时间',
        other:{}, // 一些其它的属性
      },{
        id: 'rule1',
        label: '选择日期范围',
        type: 'rangePicker', 
        placeholder: '请输入选择日期范围',
        other:{}, // 一些其它的属性
      }, {
        id:'status1',
        label: '使用状态',
        type: 'select', // 下拉框
        defaultValue: '', // 默认值
        option: [{
          label: '关闭',
          value: 4,
        }],
        other:{}, // 一些其它的属性 
      }, {
        id:'status1',
        label: '地区',
        type: 'Cascader', // 下拉框
        option: ...    
        other:{}, // 一些其它的属性
      }],
      // 被隐藏起来的选项,如果默认全部显示，则不调用
      hidden: [{
        id: 'date',
        label: '更新日期',
        type: 'datePicker', // 日期选择器
        placeholder: '请输入更新日期',
        other:{}, // 一些其它的属性
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
 */
import React from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  Icon,
  Button, 
  DatePicker, 
  TimePicker,
  Cascader,
} from 'antd';
import { is, fromJS } from 'immutable';

const FormItem = Form.Item;
const { Option } = Select;
const {RangePicker} = DatePicker;

class TableSearch extends React.Component {
  state={
    expandForm: false, // 展开状态
  }  
  /**
   * [componentWillReceiveProps 子组件更新子组件]
   * @param  {[type]} nextProps [description]
   * @return {[type]}           [description]
   */
  componentWillReceiveProps(nextProps){
    if(!is(fromJS(this.props.proData), fromJS(nextProps.proData))){
      this.renderSimpleForm(nextProps);
    }
  }  
  /**
   * [componentWillMount 加载render方法之前]
   * @return {[type]} [description]
   */
  componentWillMount(){
   // this.renderSimpleForm(this.props);
  }
  toggleForm(){
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  }
  /**
   * [查询的回调函数]
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
  searchCallBack = (e, callBack) => {
    e.preventDefault();
    const {form} = this.props;
    form.validateFields((err, fieldsValue) => {      
      if (err) return;
      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };
      callBack(values);      
    });
  }
  /**
   * [重置按钮的回调函数]
   * @return {[type]} [description]
   */
  resetCallBack = (e) => {
    const {form} = this.props;
    form.resetFields();    
    this.props.resetCallBack();
  }; 
  /**
   * [renderChildrenForm description]
   * @param  {[type]} open [description]
   * @return {[type]}      [description]
   */
  renderChildrenForm(open) {
    const { getFieldDecorator } = this.props.form;
    // 获取一共需要的行数   
    let length = Math.ceil(open.length / 3);
    // 用来装根据一行3个排列之后的数组
    let item = [];
    // 将数据分为三个一行
    for(let i=0; i<length; i++) {
      let menu = open.slice(i*3, i*3+3);
      item.push(menu);
    }   
    const colLayout = {
      md:{span :8},
      sm:{span: 24}
    };
    const formItemLayout = {};
    return (<Form onSubmit={(e)=>{
      this.searchCallBack(e, this.props.searchCallBack)
    }} layout="inline">
      {        
        item.map((value, index) => {          
          return (<Row gutter={{ md: 8, lg: 24, xl: 48 }} key={index}>
          {            
            value.map((key, _index) => {
              const {label, placeholder, id, option, defaultValue, isRequire, other} = key;
              switch(key.type) {
                case 'input':      
                  return (<Col {...colLayout} key={_index}>
                      <FormItem label={label} {...formItemLayout}>
                        {getFieldDecorator(id, {
                          initialValue: defaultValue,
                          rules: [{ required: isRequire, message: '必填' }],
                        })(<Input key={id} placeholder={placeholder} {...other}/>)}
                      </FormItem>
                  </Col>);
                case 'select':
                  return (<Col {...colLayout} key={_index}>
                      <FormItem label={label} {...formItemLayout}>
                        {getFieldDecorator(id, {
                          initialValue: defaultValue || option[0].value,
                        })(
                          <Select placeholder={placeholder} key={id} {...other}>
                            {
                              option && option.map((item) => {
                                return (<Option key={item.value} value={item.value}>{item.label}</Option>)
                              })
                            }           
                          </Select>
                        )}
                      </FormItem> 
                    </Col>);
                case 'datePicker':
                  return (<Col {...colLayout} key={_index}>
                    <FormItem label={label} {...formItemLayout}>
                      {getFieldDecorator(id, {
                          initialValue: defaultValue,
                        })(
                        <DatePicker style={{ width: '100%' }} key={id} placeholder={placeholder} {...other} />
                      )}
                    </FormItem>
                  </Col>);
                case 'timePicker':
                  return (<Col {...colLayout} key={_index}>
                    <FormItem label={label} {...formItemLayout}>
                      {getFieldDecorator(id, {
                          initialValue: defaultValue,
                        })(
                        <TimePicker style={{ width: '100%' }} key={id} placeholder={placeholder} {...other} />
                      )}
                    </FormItem>
                  </Col>);
                case 'rangePicker':
                  return (<Col {...colLayout} key={_index}>
                    <FormItem label={label} {...formItemLayout}>
                      {getFieldDecorator(id, {
                          initialValue: defaultValue,
                        })(
                        <RangePicker key={id} style={{ width: '100%' }} placeholder={placeholder} {...other} />
                      )}
                    </FormItem>
                  </Col>);
                case 'Cascader':
                  return (<Col {...colLayout} key={_index}>
                    <FormItem label={label} {...formItemLayout}>
                      {getFieldDecorator(id, {
                          initialValue: defaultValue,
                        })(
                        <Cascader options={option} placeholder={placeholder} {...other} />
                      )}
                    </FormItem>
                  </Col>);
                default:
                  return '';
              }                       
            })          
          }
          
          {
            (item[item.length-1].length !== 3 && index === item.length-1) &&
            (<Col md={3} sm={9}>
            <span className='submitButtons'>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.resetCallBack}>
                重置
              </Button>
              {
                this.props.btns && this.props.btns.map((item, index)=>{
                  return (<Button key={index} style={{ marginLeft: 8 }} onClick={(e)=>{
                    this.searchCallBack(e, item.callBack);                    
                  }}>
                    {item.text}
                  </Button>)
                })
              }
              {
                this.props.hidden &&
                (<a style={{ marginLeft: 8 }} onClick={this.toggleForm.bind(this)}>
                  {
                    this.state.expandForm ? '收起' : '展开'
                  }
                  {
                    this.state.expandForm ? <Icon type="up" /> : <Icon type="down" />
                  }
                </a>)
              }
            </span>
          </Col>)
          }          
          </Row>)      
        })
      }
      {
        item[item.length-1].length === 3 &&
        (<div style={{ overflow: 'hidden' }}>
          <span style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.resetCallBack}>
              重置
            </Button>
            {
              this.props.btns && this.props.btns.map((item, index)=>{
                return (<Button key={index} style={{ marginLeft: 8 }} onClick={(e)=>{
                  this.searchCallBack(e, item.callBack); 
                }}>
                  {item.text}
                </Button>)
              })
            }
            {
              this.props.hidden &&
              (<a style={{ marginLeft: 8 }} onClick={this.toggleForm.bind(this)}>
                {
                  this.state.expandForm ? '收起' : '展开'
                }
                {
                  this.state.expandForm ? <Icon type="up" /> : <Icon type="down" />
                }
              </a>)
            }            
          </span>
        </div>)
      }
    </Form>)
  }
  /**
   * [renderForm 获取当前的json]
   * @return {[type]} [description]
   */
  renderForm() {
    const { expandForm } = this.state;
    const {open, hidden} = this.props;    
    let json = expandForm ? open.concat(hidden) : open;
    return this.renderChildrenForm(json);    
  }
  render() {
    return (<div>
      {this.renderForm()}
    </div>)    
  }
}
const WrappedRegistrationForm = Form.create()(TableSearch);
export default WrappedRegistrationForm;