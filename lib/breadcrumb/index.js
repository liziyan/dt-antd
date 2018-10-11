'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
var SiderDemo = function (_React$Component) {
  _inherits(SiderDemo, _React$Component);

  function SiderDemo() {
    _classCallCheck(this, SiderDemo);

    return _possibleConstructorReturn(this, (SiderDemo.__proto__ || Object.getPrototypeOf(SiderDemo)).apply(this, arguments));
  }

  _createClass(SiderDemo, [{
    key: 'render',
    value: function render() {
      var routes = this.props.menu;
      return _react2.default.createElement(
        _antd.Breadcrumb,
        { className: 'breadcrumb' },
        routes.map(function (route, index) {
          return !route.path ? _react2.default.createElement(
            _antd.Breadcrumb.Item,
            { key: index },
            _react2.default.createElement(
              'span',
              null,
              route.title
            )
          ) : _react2.default.createElement(
            _antd.Breadcrumb.Item,
            { key: index },
            _react2.default.createElement(
              _reactRouterDom.Link,
              { to: '/' + route.path },
              route.title
            )
          );
        })
      );
    }
  }]);

  return SiderDemo;
}(_react2.default.Component);

exports.default = SiderDemo;
//# sourceMappingURL=index.js.map