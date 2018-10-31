'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

require('./index.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @describe： 列表表格的公用组件。直接取用的ant-design-pro的封装组件，代码注释后期有时间加上
 * @author: ant-design-pro
 * @update:2018-08-20 新增noCheck参数，true表示不显示勾选框
 *                    修改勾选框的disabled为readOnly,因为和后台的字段冲突
 * @update:2018-08-22 新增scroll参与，用于表格的固定显示
 * @updata:2018-08-24 新增footer，用于页脚的显示
 */
function initTotalList(columns) {
  var totalList = [];
  columns.forEach(function (column) {
    if (column.needTotal) {
      totalList.push(_extends({}, column, { total: 0 }));
    }
  });
  return totalList;
}

var StandardTable = function (_PureComponent) {
  _inherits(StandardTable, _PureComponent);

  function StandardTable(props) {
    _classCallCheck(this, StandardTable);

    var _this = _possibleConstructorReturn(this, (StandardTable.__proto__ || Object.getPrototypeOf(StandardTable)).call(this, props));

    _initialiseProps.call(_this);

    var columns = props.columns;

    var needTotalList = initTotalList(columns);

    _this.state = {
      selectedRowKeys: [],
      needTotalList: needTotalList
    };
    return _this;
  }

  _createClass(StandardTable, [{
    key: 'render',
    value: function render() {
      var _state = this.state,
          selectedRowKeys = _state.selectedRowKeys,
          needTotalList = _state.needTotalList;
      var _props = this.props,
          _props$data = _props.data,
          list = _props$data.list,
          pagination = _props$data.pagination,
          loading = _props.loading,
          columns = _props.columns,
          rowKey = _props.rowKey,
          noCheck = _props.noCheck,
          selectBtns = _props.selectBtns,
          scroll = _props.scroll,
          footer = _props.footer;

      var tableList = void 0;
      if (!!list) {
        tableList = list.map(function (item) {
          item.scrollDisplayName = item.scrollDisplay ? "是" : "否";
          return _extends({}, item);
        });
      }
      var paginationProps = _extends({
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: function showTotal(total) {
          return '\u5171' + total + '\u6761';
        },
        // hideOnSinglePage: true,//只有一页时隐藏分页器
        pageSizeOptions: ["10", "25", "50", "100"]
      }, pagination);
      var rowSelection = {
        selectedRowKeys: selectedRowKeys,
        onChange: this.handleRowSelectChange,
        getCheckboxProps: function getCheckboxProps(record) {
          return {
            disabled: record.readOnly
          };
        }
      };

      return _react2.default.createElement(
        'div',
        { className: 'standardTable' },
        !noCheck && _react2.default.createElement(
          'div',
          { className: 'tableAlert' },
          _react2.default.createElement(_antd.Alert, {
            message: _react2.default.createElement(
              _react.Fragment,
              null,
              '\u5DF2\u9009\u62E9 ',
              _react2.default.createElement(
                'a',
                { style: { fontWeight: 600 } },
                selectedRowKeys.length
              ),
              ' \u9879\xA0\xA0',
              needTotalList.map(function (item) {
                return _react2.default.createElement(
                  'span',
                  { style: { marginLeft: 8 }, key: item.dataIndex },
                  item.title,
                  '\u603B\u8BA1\xA0',
                  _react2.default.createElement(
                    'span',
                    { style: { fontWeight: 600 } },
                    item.render ? item.render(item.total) : item.total
                  )
                );
              }),
              _react2.default.createElement(
                'a',
                { onClick: this.cleanSelectedKeys, style: { marginLeft: 24 } },
                '\u6E05\u7A7A'
              ),
              selectBtns && selectBtns.map(function (item, index) {
                if (item.judgeShow && selectedRowKeys.length > 0 || !item.judgeShow) {
                  return _react2.default.createElement(
                    'a',
                    { key: index, onClick: item.callBack, style: { marginLeft: 24 } },
                    item.title
                  );
                } else return '';
              })
            ),
            type: 'info',
            showIcon: true
          })
        ),
        noCheck ? _react2.default.createElement(_antd.Table, {
          loading: loading,
          rowKey: rowKey || 'key',
          dataSource: tableList,
          columns: columns,
          pagination: paginationProps,
          onChange: this.handleTableChange,
          footer: footer,
          scroll: scroll
        }) : _react2.default.createElement(_antd.Table, {
          loading: loading,
          rowKey: rowKey || 'key',
          rowSelection: rowSelection,
          dataSource: tableList,
          columns: columns,
          pagination: paginationProps,
          footer: footer,
          onChange: this.handleTableChange,
          scroll: scroll
        })
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps, state) {
      if (nextProps.selectedRows && nextProps.selectedRows.length === 0) {
        var needTotalList = initTotalList(nextProps.columns);
        return {
          selectedRowKeys: [],
          needTotalList: needTotalList
        };
      }
      return null;
    }
  }]);

  return StandardTable;
}(_react.PureComponent);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.handleRowSelectChange = function (selectedRowKeys, selectedRows) {
    var list = _this2.state.needTotalList;
    var onSelectRow = _this2.props.onSelectRow;

    var needTotalList = [].concat(_toConsumableArray(list));
    needTotalList = needTotalList.map(function (item) {
      return _extends({}, item, {
        total: selectedRows.reduce(function (sum, val) {
          return sum + parseFloat(val[item.dataIndex], 10);
        }, 0)
      });
    });

    if (onSelectRow) {
      onSelectRow(selectedRows);
    }

    _this2.setState({ selectedRowKeys: selectedRowKeys, needTotalList: needTotalList });
  };

  this.handleTableChange = function (pagination, filters, sorter) {
    var onChange = _this2.props.onChange;

    onChange(pagination, filters, sorter);
  };

  this.cleanSelectedKeys = function () {
    _this2.handleRowSelectChange([], []);
  };
};

exports.default = StandardTable;
//# sourceMappingURL=index.js.map