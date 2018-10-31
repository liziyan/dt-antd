'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _antd = require('antd');

require('./index.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SubMenu = _antd.Menu.SubMenu;

var SiderMenuWrapper = function (_React$PureComponent) {
  _inherits(SiderMenuWrapper, _React$PureComponent);

  function SiderMenuWrapper() {
    _classCallCheck(this, SiderMenuWrapper);

    return _possibleConstructorReturn(this, (SiderMenuWrapper.__proto__ || Object.getPrototypeOf(SiderMenuWrapper)).apply(this, arguments));
  }

  _createClass(SiderMenuWrapper, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          selectedKeys = _props.selectedKeys,
          menuProps = _props.menuProps,
          menu = _props.menu,
          path = _props.path,
          isTop = _props.isTop,
          theme = _props.theme,
          handleOpen = _props.handleOpen;

      return _react2.default.createElement(
        _antd.Menu,
        _extends({
          key: 'Menu',
          theme: '' + (theme.navTheme || 'dark'),
          mode: '' + (isTop ? 'horizontal' : 'inline'),
          selectedKeys: [selectedKeys],
          onOpenChange: handleOpen
        }, menuProps),
        menu && menu.map(function (item) {
          return _react2.default.createElement(
            SubMenu,
            {
              key: item.code,
              title: _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(_antd.Icon, { type: item.icon }),
                _react2.default.createElement(
                  'span',
                  null,
                  item.name
                )
              )
            },
            item.subMenus && item.subMenus.map(function (value) {
              return _react2.default.createElement(
                _antd.Menu.Item,
                { key: value.code },
                value.url !== path ? _react2.default.createElement(
                  _reactRouterDom.Link,
                  { to: '' + value.url },
                  value.name
                ) : value.name
              );
            })
          );
        })
      );
    }
  }]);

  return SiderMenuWrapper;
}(_react2.default.PureComponent);

exports.default = SiderMenuWrapper;
//# sourceMappingURL=menu.js.map