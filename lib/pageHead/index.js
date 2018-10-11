'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _index = require('../breadcrumb/index');

var _index2 = _interopRequireDefault(_index);

require('./index.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TabPane = _antd.Tabs.TabPane;
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

var PageHead = function (_React$Component) {
  _inherits(PageHead, _React$Component);

  function PageHead() {
    _classCallCheck(this, PageHead);

    return _possibleConstructorReturn(this, (PageHead.__proto__ || Object.getPrototypeOf(PageHead)).apply(this, arguments));
  }

  _createClass(PageHead, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          nav = _props.nav,
          title = _props.title,
          logo = _props.logo,
          action = _props.action,
          content = _props.content,
          extraContent = _props.extraContent,
          tabList = _props.tabList,
          tabDefaultActiveKey = _props.tabDefaultActiveKey,
          tabActiveKey = _props.tabActiveKey,
          tabBarExtraContent = _props.tabBarExtraContent,
          onTabChange = _props.onTabChange;

      var activeKeyProps = {};
      if (tabDefaultActiveKey !== undefined) {
        activeKeyProps.defaultActiveKey = tabDefaultActiveKey;
      }
      if (tabActiveKey !== undefined) {
        activeKeyProps.activeKey = tabActiveKey;
      }
      return _react2.default.createElement(
        'div',
        { className: 'pageHeader' },
        nav && _react2.default.createElement(_index2.default, { menu: nav }),
        _react2.default.createElement(
          'div',
          { className: 'detail' },
          logo && _react2.default.createElement(
            'div',
            { className: 'logo' },
            logo
          ),
          _react2.default.createElement(
            'div',
            { className: 'main' },
            _react2.default.createElement(
              'div',
              { className: 'row' },
              title && _react2.default.createElement(
                'h1',
                { className: 'title' },
                title
              ),
              action && _react2.default.createElement(
                'div',
                { className: 'action' },
                action
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'row' },
              content && _react2.default.createElement(
                'div',
                { className: 'content' },
                content
              ),
              extraContent && _react2.default.createElement(
                'div',
                { className: 'extraContent' },
                extraContent
              )
            )
          )
        ),
        tabList && tabList.length && _react2.default.createElement(
          _antd.Tabs,
          _extends({
            className: 'tabs'
          }, activeKeyProps, {
            onChange: function onChange(key) {
              if (onTabChange) {
                onTabChange(key);
              }
            },
            tabBarExtraContent: tabBarExtraContent
          }),
          tabList.map(function (item) {
            return _react2.default.createElement(TabPane, { tab: item.tab, key: item.key });
          })
        )
      );
    }
  }]);

  return PageHead;
}(_react2.default.Component);

exports.default = PageHead;
//# sourceMappingURL=index.js.map