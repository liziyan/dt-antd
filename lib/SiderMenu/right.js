'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

require('./index.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
          other = _props.other,
          userItem = _props.userItem,
          userChange = _props.userChange,
          userPhoto = _props.userPhoto,
          userName = _props.userName,
          logOut = _props.logOut,
          theme = _props.theme;
      // 用户名对应的下拉菜单

      var _menu = userItem ? userItem : _react2.default.createElement(
        _antd.Menu,
        { className: 'header_menu' },
        _react2.default.createElement(
          _antd.Menu.Item,
          { key: 'logout', onClick: function onClick() {
              if (logOut) logOut();
            } },
          _react2.default.createElement(_antd.Icon, { type: 'logout' }),
          '\u9000\u51FA\u767B\u5F55'
        )
      );
      return _react2.default.createElement(
        'div',
        { className: 'right' },
        other,
        _react2.default.createElement(
          _antd.Dropdown,
          { overlay: _menu },
          userChange || _react2.default.createElement(
            'span',
            { className: 'action' },
            _react2.default.createElement(_antd.Avatar, { size: 'small', className: 'avatar', src: userPhoto || 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png' }),
            _react2.default.createElement(
              'span',
              { className: '' + (theme.isTop && theme.navTheme !== 'light' ? 'colorWhite' : '') },
              userName ? userName : '用户名'
            )
          )
        )
      );
    }
  }]);

  return SiderMenuWrapper;
}(_react2.default.PureComponent);

exports.default = SiderMenuWrapper;
//# sourceMappingURL=right.js.map