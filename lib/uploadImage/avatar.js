'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _immutable = require('immutable');

require('./style.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
      previewVisible: false, // 是否显示大图
      previewImage: '', // 大图的地址
      fileList: [], // 显示的缩略图地址
      loading: false,
      picName: 'xxx.png'
    }, _this.handleCancel = function () {
      return _this.setState({ previewVisible: false });
    }, _this.handlePreview = function (file) {
      _this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true
      });
    }, _this.handleRemove = function () {
      var fileLists = [];
      _this.setState({
        fileList: fileLists
      });
      _this.props.handleUploadImg();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TableDrawer, [{
    key: 'beforeUpload',

    /**
     * [beforeUpload 判断上传图片]
     * @param  {[type]} file [description]
     * @return {[type]}      [description]
     */
    value: function beforeUpload(file) {
      var isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        _antd.message.error('图片太大超过2MB啦!');
      }
      return isLt2M;
    }
    /**
     * [关闭缩略图]
     * @return {[type]} [description]
     */

    /**
     * [查看大图]
     * @param  {[type]} file [description]
     */

    /**
     * [删除照片]
     */

  }, {
    key: 'componentWillReceiveProps',

    /**
     * [componentWillReceiveProps 子组件更新子组件]
     * @param  {[type]} nextProps [description]
     * @return {[type]}           [description]
     */
    value: function componentWillReceiveProps(nextProps) {
      if (!(0, _immutable.is)((0, _immutable.fromJS)(this.props), (0, _immutable.fromJS)(nextProps)) && nextProps.imageUrl && !this.state.imageUrl) {
        var list = [{
          uid: -1,
          name: 'xxx.png',
          status: 'done',
          url: nextProps.imageUrl
        }];
        this.setState({
          fileList: list
        });
      }
    }
    /**
     * [shouldComponentUpdate 如果state值没有改变时就算调用了setState方法，页面也不会重新渲染]
     * @param  {[type]} nextProps [description]
     * @param  {[type]} nextState [description]
     * @return {[type]}           [description]
     */

  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !(0, _immutable.is)((0, _immutable.fromJS)(this.props), (0, _immutable.fromJS)(nextProps)) || !(0, _immutable.is)((0, _immutable.fromJS)(this.state), (0, _immutable.fromJS)(nextState));
    }
    /**
     * [render description]
     * @return {[type]} [description]
     */

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          previewVisible = _state.previewVisible,
          previewImage = _state.previewImage,
          fileList = _state.fileList,
          loading = _state.loading;
      var url = this.props.url;

      var uploadButton = loading ? _react2.default.createElement(_antd.Icon, { type: 'loading' }) : _react2.default.createElement(_antd.Icon, { type: 'camera' });
      return _react2.default.createElement(
        'div',
        { className: 'clearfix avatar' },
        _react2.default.createElement(
          _antd.Upload,
          {
            action: url,
            listType: 'picture-card',
            accept: 'image/png,image/jpg,image/jpeg,image/bmp',
            fileList: fileList,
            withCredentials: true,
            onSuccess: function onSuccess(res) {
              if (res.success) {
                var list = [{
                  uid: -1,
                  name: _this2.state.picName,
                  status: 'done',
                  url: res.data
                }];
                _this2.setState({
                  fileList: list,
                  loading: false
                });
                _this2.props.handleUploadImg(res.data);
              } else {
                _antd.message.error(res.message);
              }
            },
            onPreview: this.handlePreview,
            onRemove: this.handleRemove,
            onChange: function onChange(info) {
              _this2.setState({
                loading: true,
                picName: info.file.name
              });
            }
          },
          fileList.length >= 1 ? null : uploadButton
        )
      );
    }
  }]);

  return TableDrawer;
}(_react2.default.Component);

exports.default = TableDrawer;
//# sourceMappingURL=avatar.js.map