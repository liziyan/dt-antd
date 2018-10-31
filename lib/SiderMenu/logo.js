'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

require('./index.less');

var _logo = require('./logo.png');

var _logo2 = _interopRequireDefault(_logo);

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
          logo = _props.logo,
          title = _props.title,
          theme = _props.theme;

      return _react2.default.createElement(
        'div',
        { className: '' + (theme.navTheme === 'light' ? 'navLogo navLogoWhite' : 'navLogo'), key: 'logo' },
        _react2.default.createElement(
          _reactRouterDom.Link,
          { to: '/' },
          _react2.default.createElement('img', { src: logo || _logo2.default, alt: 'logo' }),
          _react2.default.createElement(
            'h1',
            null,
            title || '管理系统'
          )
        )
      );
    }
  }]);

  return SiderMenuWrapper;
}(_react2.default.PureComponent);

exports.default = SiderMenuWrapper;
//# sourceMappingURL=logo.js.map