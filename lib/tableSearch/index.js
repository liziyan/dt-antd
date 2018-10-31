'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var FormItem = _antd.Form.Item;
var Option = _antd.Select.Option;
var RangePicker = _antd.DatePicker.RangePicker;

var TableSearch = function (_React$Component) {
  _inherits(TableSearch, _React$Component);

  function TableSearch() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TableSearch);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TableSearch.__proto__ || Object.getPrototypeOf(TableSearch)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      expandForm: false // 展开状态

      /**
       * [componentWillReceiveProps 子组件更新子组件]
       * @param  {[type]} nextProps [description]
       * @return {[type]}           [description]
       */
    }, _this.searchCallBack = function (e) {
      e.preventDefault();
      var form = _this.props.form;

      form.validateFields(function (err, fieldsValue) {
        if (err) return;
        var values = _extends({}, fieldsValue, {
          updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf()
        });
        _this.props.searchCallBack(values);
      });
    }, _this.resetCallBack = function (e) {
      var form = _this.props.form;

      form.resetFields();
      _this.props.resetCallBack();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TableSearch, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!(0, _immutable.is)((0, _immutable.fromJS)(this.props.proData), (0, _immutable.fromJS)(nextProps.proData))) {
        this.renderSimpleForm(nextProps);
      }
    }
    /**
     * [componentWillMount 加载render方法之前]
     * @return {[type]} [description]
     */

  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      // this.renderSimpleForm(this.props);
    }
  }, {
    key: 'toggleForm',
    value: function toggleForm() {
      var expandForm = this.state.expandForm;

      this.setState({
        expandForm: !expandForm
      });
    }
    /**
     * [查询的回调函数]
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */

    /**
     * [重置按钮的回调函数]
     * @return {[type]} [description]
     */

  }, {
    key: 'renderChildrenForm',

    /**
     * [renderChildrenForm description]
     * @param  {[type]} open [description]
     * @return {[type]}      [description]
     */
    value: function renderChildrenForm(open) {
      var _this2 = this;

      var getFieldDecorator = this.props.form.getFieldDecorator;
      // 获取一共需要的行数   

      var length = Math.ceil(open.length / 3);
      // 用来装根据一行3个排列之后的数组
      var item = [];
      // 将数据分为三个一行
      for (var i = 0; i < length; i++) {
        var menu = open.slice(i * 3, i * 3 + 3);
        item.push(menu);
      }
      var colLayout = {
        md: { span: 8 },
        sm: { span: 24 }
      };
      var formItemLayout = {};
      return _react2.default.createElement(
        _antd.Form,
        { onSubmit: this.searchCallBack, layout: 'inline' },
        item.map(function (value, index) {
          return _react2.default.createElement(
            _antd.Row,
            { gutter: { md: 8, lg: 24, xl: 48 }, key: index },
            value.map(function (key, _index) {
              var label = key.label,
                  placeholder = key.placeholder,
                  id = key.id,
                  option = key.option,
                  defaultValue = key.defaultValue,
                  isRequire = key.isRequire;

              switch (key.type) {
                case 'input':
                  return _react2.default.createElement(
                    _antd.Col,
                    _extends({}, colLayout, { key: _index }),
                    _react2.default.createElement(
                      FormItem,
                      _extends({ label: label }, formItemLayout),
                      getFieldDecorator(id, {
                        initialValue: defaultValue,
                        rules: [{ required: isRequire, message: '必填' }]
                      })(_react2.default.createElement(_antd.Input, { key: id, placeholder: placeholder }))
                    )
                  );
                case 'select':
                  return _react2.default.createElement(
                    _antd.Col,
                    _extends({}, colLayout, { key: _index }),
                    _react2.default.createElement(
                      FormItem,
                      _extends({ label: label }, formItemLayout),
                      getFieldDecorator(id, {
                        initialValue: defaultValue || option[0].value
                      })(_react2.default.createElement(
                        _antd.Select,
                        { placeholder: placeholder, key: id },
                        option && option.map(function (item) {
                          return _react2.default.createElement(
                            Option,
                            { key: item.value, value: item.value },
                            item.label
                          );
                        })
                      ))
                    )
                  );
                case 'datePicker':
                  return _react2.default.createElement(
                    _antd.Col,
                    _extends({}, colLayout, { key: _index }),
                    _react2.default.createElement(
                      FormItem,
                      _extends({ label: label }, formItemLayout),
                      getFieldDecorator(id)(_react2.default.createElement(_antd.DatePicker, { style: { width: '100%' }, key: id, placeholder: placeholder }))
                    )
                  );
                case 'timePicker':
                  return _react2.default.createElement(
                    _antd.Col,
                    _extends({}, colLayout, { key: _index }),
                    _react2.default.createElement(
                      FormItem,
                      _extends({ label: label }, formItemLayout),
                      getFieldDecorator(id)(_react2.default.createElement(_antd.TimePicker, { style: { width: '100%' }, key: id, placeholder: placeholder }))
                    )
                  );
                case 'rangePicker':
                  return _react2.default.createElement(
                    _antd.Col,
                    _extends({}, colLayout, { key: _index }),
                    _react2.default.createElement(
                      FormItem,
                      _extends({ label: label }, formItemLayout),
                      getFieldDecorator(id)(_react2.default.createElement(RangePicker, { key: id, style: { width: '100%' }, placeholder: placeholder }))
                    )
                  );
                default:
                  return '';
              }
            }),
            item[item.length - 1].length !== 3 && index === item.length - 1 && _react2.default.createElement(
              _antd.Col,
              { md: 3, sm: 9 },
              _react2.default.createElement(
                'span',
                { className: 'submitButtons' },
                _react2.default.createElement(
                  _antd.Button,
                  { type: 'primary', htmlType: 'submit' },
                  '\u641C\u7D22'
                ),
                _react2.default.createElement(
                  _antd.Button,
                  { style: { marginLeft: 8 }, onClick: _this2.resetCallBack },
                  '\u91CD\u7F6E'
                ),
                _this2.props.btns && _this2.props.btns.map(function (item, index) {
                  return _react2.default.createElement(
                    _antd.Button,
                    { key: index, style: { marginLeft: 8 }, onClick: function onClick() {
                        item.callBack();
                      } },
                    item.text
                  );
                }),
                _this2.props.hidden && _react2.default.createElement(
                  'a',
                  { style: { marginLeft: 8 }, onClick: _this2.toggleForm.bind(_this2) },
                  _this2.state.expandForm ? '收起' : '展开',
                  _this2.state.expandForm ? _react2.default.createElement(_antd.Icon, { type: 'up' }) : _react2.default.createElement(_antd.Icon, { type: 'down' })
                )
              )
            )
          );
        }),
        item[item.length - 1].length === 3 && _react2.default.createElement(
          'div',
          { style: { overflow: 'hidden' } },
          _react2.default.createElement(
            'span',
            { style: { float: 'right', marginBottom: 24 } },
            _react2.default.createElement(
              _antd.Button,
              { type: 'primary', htmlType: 'submit' },
              '\u641C\u7D22'
            ),
            _react2.default.createElement(
              _antd.Button,
              { style: { marginLeft: 8 }, onClick: this.resetCallBack },
              '\u91CD\u7F6E'
            ),
            this.props.btns && this.props.btns.map(function (item, index) {
              return _react2.default.createElement(
                _antd.Button,
                { key: index, style: { marginLeft: 8 }, onClick: function onClick() {
                    item.callBack();
                  } },
                item.text
              );
            }),
            this.props.hidden && _react2.default.createElement(
              'a',
              { style: { marginLeft: 8 }, onClick: this.toggleForm.bind(this) },
              this.state.expandForm ? '收起' : '展开',
              this.state.expandForm ? _react2.default.createElement(_antd.Icon, { type: 'up' }) : _react2.default.createElement(_antd.Icon, { type: 'down' })
            )
          )
        )
      );
    }
    /**
     * [renderForm 获取当前的json]
     * @return {[type]} [description]
     */

  }, {
    key: 'renderForm',
    value: function renderForm() {
      var expandForm = this.state.expandForm;
      var _props = this.props,
          open = _props.open,
          hidden = _props.hidden;

      var json = expandForm ? open.concat(hidden) : open;
      return this.renderChildrenForm(json);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this.renderForm()
      );
    }
  }]);

  return TableSearch;
}(_react2.default.Component);

var WrappedRegistrationForm = _antd.Form.create()(TableSearch);
exports.default = WrappedRegistrationForm;
//# sourceMappingURL=index.js.map