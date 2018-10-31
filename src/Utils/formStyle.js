/**
 * name: 表单页formItemLayout和submitFormLayout频繁使用，在这里统一配置可复用
 * author: 雏田
 * version: 1.0
 * time: 2018-08-21
 */
export default {
  /**
   * [编辑时的一行显示一列的fromItemStyle]
   * @type {Object}
   */
  editFormDrawer: {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 15 },
    },
  },
  /**
   * [编辑时的一行显示一列的fromItemStyle]
   * @type {Object}
   */
  editFormDrawerSmall: {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  },  
  /**
   * [formItemLayout]
   * @return {[type]}      [设置的值]
   */
  formItemLayout: () => {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };
    return formItemLayout;
  }, 
  /**
   * [formItemLayout]
   * @return {[type]}      [设置的值]
   */
  submitFormLayout: () => {
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    return submitFormLayout;
  }
}

