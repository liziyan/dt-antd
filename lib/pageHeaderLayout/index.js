'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('../pageHead/index');

var _index2 = _interopRequireDefault(_index);

require('./index.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * @describe:[框架一共分左上中，这里是框架的中部分。中又分上中下，上可无，中是面包屑部分，下是用户操作部分]
 * @author : 雏田
 * @time :2018-08-02
 * @param  {[type]}    options.children         [用户操作部分]
 * @param  {[type]}    options.wrapperClassName [自定义的样式]
 * @param  {[type]}    options.top              [上部分，可无]
 * @param  {...[type]} options.restProps        [面包屑部分的props]
 */
exports.default = function (_ref) {
  var children = _ref.children,
      wrapperClassName = _ref.wrapperClassName,
      top = _ref.top,
      copyright = _ref.copyright,
      restProps = _objectWithoutProperties(_ref, ['children', 'wrapperClassName', 'top', 'copyright']);

  return _react2.default.createElement(
    'div',
    { className: wrapperClassName },
    top,
    _react2.default.createElement(_index2.default, restProps),
    children ? _react2.default.createElement(
      'div',
      { className: 'content' },
      children
    ) : null,
    copyright
  );
};
//# sourceMappingURL=index.js.map