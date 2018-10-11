import React from 'react';
import PageHeader from '../pageHead/index';
import './index.less';
/**
 * @describe:[框架一共分左上中，这里是框架的中部分。中又分上中下，上可无，中是面包屑部分，下是用户操作部分]
 * @author : 雏田
 * @time :2018-08-02
 * @param  {[type]}    options.children         [用户操作部分]
 * @param  {[type]}    options.wrapperClassName [自定义的样式]
 * @param  {[type]}    options.top              [上部分，可无]
 * @param  {...[type]} options.restProps        [面包屑部分的props]
 */
export default ({ children, wrapperClassName, top, copyright, ...restProps }) => (
  <div className={wrapperClassName}>
    {top}    
    <PageHeader {...restProps} />
    {children ? <div className='content'>{children}</div> : null}
    {copyright}
  </div>
);
