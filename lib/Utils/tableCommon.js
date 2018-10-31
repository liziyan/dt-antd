'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * 有表格的页面，都会用到的公用方法
                                                                                                                                                                                                                                                                   */


var _immutable = require('immutable');

exports.default = {
  /**
   * [表格更改之后的方法，改变state重新查询]
   * @param  {[type]} options.state      [当前的state，searchList表示搜索条件，每个页面需一致]
   * @param  {[type]} options.callBack   [回调函数，改变state,并重新搜索]
   * @param  {[type]} options.pagination [分页的返回参数]
   */
  tableChange: function tableChange(_ref) {
    var state = _ref.state,
        callBack = _ref.callBack,
        pagination = _ref.pagination;

    var searchList = _extends({}, state.searchList, {
      currentPage: pagination.current,
      pageSize: pagination.pageSize
    });
    if (!(0, _immutable.is)((0, _immutable.fromJS)(state.searchList), (0, _immutable.fromJS)(searchList))) {
      callBack({
        searchList: searchList,
        currentNo: pagination.current,
        pageSize: pagination.pageSize
      });
    }
  },
  /**
   * [搜索表格（搜索按钮点击）]
   * @param  {[type]} options.state    [当前的state,searchList表示搜索条件，每个页面需一致]
   * @param  {[type]} options.values   [搜索的条件，只接收最终的至]
   * @param  {[type]} options.callBack [回调函数，改变state,并重新请求数据]
   */
  tableSearch: function tableSearch(_ref2) {
    var state = _ref2.state,
        values = _ref2.values,
        callBack = _ref2.callBack;

    var text = _extends({}, values);
    // 将所有的""空，转为null，方便后台接收
    text = JSON.parse(JSON.stringify(text).replace(/""/g, null));
    // 对比两次的搜索条件，如果不同的话执行搜索请求
    if (!(0, _immutable.is)((0, _immutable.fromJS)(state.searchList), (0, _immutable.fromJS)(text))) {
      callBack({
        searchList: text,
        currentNo: 1
      });
    }
  },
  /**
   * [搜索表格（搜索按钮点击）定制公交专用，因为status返回的数组]
   * @param  {[type]} options.state    [当前的state,searchList表示搜索条件，每个页面需一致]
   * @param  {[type]} options.values   [搜索的条件，只接收最终的至]
   * @param  {[type]} options.callBack [回调函数，改变state,并重新请求数据]
   */
  tableSearchCustom: function tableSearchCustom(_ref3) {
    var state = _ref3.state,
        values = _ref3.values,
        callBack = _ref3.callBack;

    var text = _extends({}, values);
    // 将所有的""空，转为null，方便后台接收
    text = JSON.parse(JSON.stringify(text).replace(/""/g, null));
    if (text.status >= 0) text.status = [text.status];
    // 对比两次的搜索条件，如果不同的话执行搜索请求
    if (!(0, _immutable.is)((0, _immutable.fromJS)(state.searchList), (0, _immutable.fromJS)(text))) {
      callBack({
        searchList: text,
        currentNo: 1
      });
    }
  }
};
//# sourceMappingURL=tableCommon.js.map