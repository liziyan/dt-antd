/**
 * 有表格的页面，都会用到的公用方法
 */
import { is, fromJS } from 'immutable';
export default {
  /**
   * [表格更改之后的方法，改变state重新查询]
   * @param  {[type]} options.state      [当前的state，searchList表示搜索条件，每个页面需一致]
   * @param  {[type]} options.callBack   [回调函数，改变state,并重新搜索]
   * @param  {[type]} options.pagination [分页的返回参数]
   */
  tableChange: ({state, callBack, pagination}) =>{
    let searchList = {
      ...state.searchList,
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    }
    if(!is(fromJS(state.searchList), fromJS(searchList))){
      callBack({
        searchList,
        currentNo: pagination.current,
        pageSize: pagination.pageSize,
      })      
    }
  },
  /**
   * [搜索表格（搜索按钮点击）]
   * @param  {[type]} options.state    [当前的state,searchList表示搜索条件，每个页面需一致]
   * @param  {[type]} options.values   [搜索的条件，只接收最终的至]
   * @param  {[type]} options.callBack [回调函数，改变state,并重新请求数据]
   */
  tableSearch: ({state, values, callBack})=>{
    let text = {
      ...values,
    }   
    // 将所有的""空，转为null，方便后台接收
    text = JSON.parse(JSON.stringify(text).replace(/""/g,null));
    // 对比两次的搜索条件，如果不同的话执行搜索请求
    if(!is(fromJS(state.searchList), fromJS(text))){
      callBack({
        searchList: text,
        currentNo: 1,
      })
    }
  },
  /**
   * [搜索表格（搜索按钮点击）定制公交专用，因为status返回的数组]
   * @param  {[type]} options.state    [当前的state,searchList表示搜索条件，每个页面需一致]
   * @param  {[type]} options.values   [搜索的条件，只接收最终的至]
   * @param  {[type]} options.callBack [回调函数，改变state,并重新请求数据]
   */
  tableSearchCustom: ({state, values, callBack})=>{
    let text = {
      ...values,
    }   
    // 将所有的""空，转为null，方便后台接收
    text = JSON.parse(JSON.stringify(text).replace(/""/g,null));  
    if(text.status >= 0) text.status = [text.status];    
    // 对比两次的搜索条件，如果不同的话执行搜索请求
    if(!is(fromJS(state.searchList), fromJS(text))){
      callBack({
        searchList: text,
        currentNo: 1,
      })
    }
  },
}