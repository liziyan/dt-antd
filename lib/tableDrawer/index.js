'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _index2 = require('../reviewImage/index');

var _index3 = _interopRequireDefault(_index2);

require('./index.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
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


var TableDrawer = function (_React$Component) {
  _inherits(TableDrawer, _React$Component);

  function TableDrawer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TableDrawer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TableDrawer.__proto__ || Object.getPrototypeOf(TableDrawer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      showModal: false,
      ModalImg: null
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TableDrawer, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var data = this.props.data;
      var _state = this.state,
          showModal = _state.showModal,
          ModalImg = _state.ModalImg;

      return _react2.default.createElement(
        'div',
        null,
        data && data.map(function (item, index) {
          return _react2.default.createElement(
            'div',
            { key: index },
            !!item.title && index !== 0 && _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(_antd.Divider, null),
              _react2.default.createElement(
                'p',
                { className: 'pStyle' },
                item.title
              )
            ),
            !!item.title && index === 0 && _react2.default.createElement(
              'p',
              { className: 'pStyle' },
              item.title
            ),
            _react2.default.createElement(
              _antd.Row,
              null,
              item.children.map(function (value, _index) {
                return _react2.default.createElement(
                  _antd.Col,
                  { span: value.col, key: _index },
                  _react2.default.createElement(
                    'div',
                    { className: 'tableDetailTile' },
                    _react2.default.createElement(
                      'p',
                      null,
                      value.title,
                      value.title && ':'
                    ),
                    value.content && value.content,
                    _react2.default.createElement(
                      _antd.Row,
                      null,
                      value.picUrl && _react2.default.createElement('img', { className: 'pic', src: value.picUrl, onClick: function onClick(e) {
                          _this2.setState({
                            showModal: true,
                            ModalImg: value.picUrl
                          });
                        }, alt: '' })
                    ),
                    value.linkUrl && _react2.default.createElement(
                      'a',
                      { href: value.linkUrl, target: '_blank' },
                      value.linkUrl
                    ),
                    value.tags && value.tags.map(function (item, index) {
                      return _react2.default.createElement(
                        _antd.Tag,
                        { key: index },
                        item
                      );
                    })
                  )
                );
              })
            )
          );
        }),
        showModal && _react2.default.createElement(_index3.default, {
          picUrl: ModalImg,
          onCancel: function onCancel() {
            _this2.setState({ showModal: false });
          }
        })
      );
    }
  }]);

  return TableDrawer;
}(_react2.default.Component);

exports.default = TableDrawer;
//# sourceMappingURL=index.js.map