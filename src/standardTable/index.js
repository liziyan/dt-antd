import React, { PureComponent, Fragment } from 'react';
import { Table, Alert } from 'antd';

/**
 * @describe： 列表表格的公用组件。直接取用的ant-design-pro的封装组件，代码注释后期有时间加上
 * @author: ant-design-pro
 * @update:2018-08-20 新增noCheck参数，true表示不显示勾选框
 *                    修改勾选框的disabled为readOnly,因为和后台的字段冲突
 * @update:2018-08-22 新增scroll参与，用于表格的固定显示
 * @updata:2018-08-24 新增footer，用于页脚的显示
 */
function initTotalList(columns) {
  const totalList = [];
  columns.forEach(column => {
    if (column.needTotal) {
      totalList.push({ ...column, total: 0 });
    }
  });
  return totalList;
}

class StandardTable extends PureComponent {
  constructor(props) {
    super(props);
    const { columns } = props;
    const needTotalList = initTotalList(columns);

    this.state = {
      selectedRowKeys: [],
      needTotalList,
    };
  }

  static getDerivedStateFromProps (nextProps, state) {
    if (nextProps.selectedRows && nextProps.selectedRows.length === 0) {
      const needTotalList = initTotalList(nextProps.columns);
      return{
        selectedRowKeys: [],
        needTotalList,
      };
    }
    return null;
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    const { needTotalList: list } = this.state;
    const { onSelectRow } = this.props;
    let needTotalList = [...list];
    needTotalList = needTotalList.map(item => {
      return {
        ...item,
        total: selectedRows.reduce((sum, val) => {
          return sum + parseFloat(val[item.dataIndex], 10);
        }, 0),
      };
    });

    if (onSelectRow) {
      onSelectRow(selectedRows);
    }

    this.setState({ selectedRowKeys, needTotalList });
  };

  handleTableChange = (pagination, filters, sorter) => {
    const { onChange } = this.props;
    onChange(pagination, filters, sorter);
  };
  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  };

  render() {
    const { selectedRowKeys, needTotalList } = this.state;
    const {
      data: { list, pagination },
      loading,
      columns,
      rowKey,
      noCheck,
      selectBtns,
      checkOther, // 自定义选中后的显示
      scroll,
      footer,
      other,
    } = this.props;  
    let tableList;
    if(!!list){
      tableList = list.map(item=> {
        item.scrollDisplayName = item.scrollDisplay ? "是" : "否";
        return {
          ...item
        };
      }); 
    }
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total) => `共${total}条`, 
      // hideOnSinglePage: true,//只有一页时隐藏分页器
      pageSizeOptions: ["10","25","50","100"],
      ...pagination,
    };
    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => {        
        return({
        disabled: record.readOnly,
      })},
    };

    return (
      <div className='standardTable'>
        {
          !noCheck && selectedRowKeys.length>0 && (<div className='tableAlert'>          
            <Alert
              message={
                <Fragment>
                  {
                    checkOther || <div>
                      已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
                      {needTotalList.map(item => (
                        <span style={{ marginLeft: 8 }} key={item.dataIndex}>
                          {item.title}
                          总计&nbsp;
                          <span style={{ fontWeight: 600 }}>
                            {item.render ? item.render(item.total) : item.total}
                          </span>
                        </span>
                      ))}
                      <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>
                        清空
                      </a>
                      {
                        selectBtns && selectBtns.map((item,index) => {
                          if((item.judgeShow && selectedRowKeys.length>0) || !item.judgeShow) {
                            return (
                              <a key={index} onClick={item.callBack} style={{marginLeft: 24}}>
                                {item.title}
                              </a>)                        
                          } else return ''
                        })
                      }
                    </div>
                  }                  
                </Fragment>
              }             
              type="info"
              showIcon={!checkOther}
            />
          </div>)
        }
        {
          noCheck ? (<Table
            loading={loading}
            rowKey={rowKey || 'key'} 
            dataSource={tableList}
            columns={columns}
            pagination={paginationProps}
            onChange={this.handleTableChange}
            footer={footer}
            scroll={scroll}
            {...other}
          />) : (<Table
            loading={loading}
            rowKey={rowKey || 'key'}                
            rowSelection={rowSelection}
            dataSource={tableList}
            columns={columns}
            pagination={paginationProps}
            footer={footer}
            onChange={this.handleTableChange}
            scroll={scroll}
            {...other}
          />)
        }
      </div>
    );
  }
}

export default StandardTable;
