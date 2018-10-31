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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @title: 查看详情中有图片时，点击图片可查看大图
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author: 雏田
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @version: 1.0.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @time: 2018-10-10
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @param {[string]}   [picUrl]   [要展示的大图的图片路径]
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @param {[function]} [onCancel] [关掉大图的回调函数]
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * 调用方法：
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 import ReviewImage from '@/components/reviewImage/index';
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 {showModal &&
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   <ReviewImage
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     picUrl={ModalImg}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     onCancel={()=>{
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       this.setState({showModal: false})
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     }}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 }
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
      width: 520, // modal的宽度
      height: 'auto' // modal的高度   

      /**
       * [componentDidMount 加载render方法之前,获取所有用户列表]
       * @return {[type]} [description]
       */
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TableDrawer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var picUrl = this.props.picUrl;

      var that = this;
      var imgtemp = new Image();
      imgtemp.src = picUrl;
      imgtemp.onload = function (event) {
        var w = event.target.width; // 图片真实高度
        var h = event.target.height; // 图片真实宽度
        var _w = document.body.offsetWidth - 200; // 屏幕宽度
        var _h = document.body.offsetHeight - 200; // 屏幕高度
        var width = (w >= _w ? _w : w) + 80;
        var height = (h >= _h ? _h : h) + 80;
        var style = h >= _h ? '' : 'flex';
        that.setState({
          width: width > 520 ? width : 520,
          height: height > 440 ? height : 440,
          style: style
        });
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          onCancel = _props.onCancel,
          picUrl = _props.picUrl;
      var _state = this.state,
          width = _state.width,
          height = _state.height,
          style = _state.style;

      return _react2.default.createElement(
        _antd.Modal,
        {
          className: 'modal ' + style,
          visible: true,
          centered: true,
          footer: null,
          width: width,
          height: height,
          onCancel: onCancel
        },
        _react2.default.createElement('img', { src: picUrl, alt: '' })
      );
    }
  }]);

  return TableDrawer;
}(_react2.default.Component);

exports.default = TableDrawer;
//# sourceMappingURL=index.js.map