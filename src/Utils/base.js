import moment from 'moment';
/**
 * name: 公共方法
 * author: 雏田
 * version: 1.1
 * time: 2018-07-20
 */
export default { 
  /**
   * [获取url参数https://a.com?a=1&b=2获取a,b的值]
   * @param  {[type]} name [参数名(a,b)]
   * @return {[type]}      [得到的值(1,2)]
   */
  getQueryString: (name) => {
      // 构造一个含有目标参数的正则表达式对象
      let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
      // 匹配目标参数
      // let urls=window.location.search.substr(1);
      let urls=window.location.href.split('?')[1];
      if (urls) {
        let r = urls.match(reg);
        if (r != null) {
            return decodeURI(r[2]);
        }
      }
      return null;
  },
  /**
   * [时间格式化]
   * @param  {[type]} times  时间戳,1535701322000这种格式
   * @param  {[type]} format 时间格式，默认为[yyyy-MM-dd hh:mm:ss],注意大小写
   * @return {[type]} date      [description]
   */
  FormatDate: (times, format = 'yyyy-MM-dd hh:mm:ss') => {
    times = new Date(times)
    let date = {
      'M+': times.getMonth() + 1,
      'd+': times.getDate(),
      'h+': times.getHours(),
      'm+': times.getMinutes(),
      's+': times.getSeconds(),
      'q+': Math.floor((times.getMonth() + 3) / 3),
      'S+': times.getMilliseconds(),
    };
    if (/(y+)/i.test(format)) {
      format = format.replace(RegExp.$1, (times.getFullYear() + '')
        .substr(4 - RegExp.$1.length));
    }
    for (let k in date) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length === 1
          ? date[k] : ('00' + date[k]).substr(('' + date[k]).length));
      }
    }    
    return format;
  },
  /**
  * [金额格式化]
  * @param  {[type]} number        [要格式化的数分]
  * @param  {[type]} isMoney       [传进来的金额单位为分,默认为true]
  * @param  {[type]} thousands_sep [千分位符号,默认为,]
  * @param  {[type]} decimals      [保留几位小数，默认为2]
  * @param  {[type]} dec_point     [小数点符号，默认为.]
  * @return {[type]}               [格式化之后的金额元]
  */
  FormatPrice: (number, isMoney = true, decimals = 2, thousands_sep = ',', dec_point = '.') => {
    // 先转为元
    if(isMoney) number = (parseInt(number, 10) / 100).toFixed(decimals);
    else {
      number = parseInt(number,10);
    }   
    number = (number + '').replace(/[^0-9+-Ee.]/g, '');        
    let n = !isFinite(+number) ? 0 : +number;    
    let prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
    let sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep;
    let dec = (typeof dec_point === 'undefined') ? '.' : dec_point;
    let s = '';
    let toFixedFix = function (n, prec) {      
      let k = Math.pow(10, prec); 
      // 防止精度缺失，要加0.5     
      return '' + Math.floor(n * k + 0.5) / k;
    };
    s = (prec ? toFixedFix(n, prec) : '' + Math.floor(n)).split('.');
    let re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
      s[0] = s[0].replace(re, "$1" + sep + "$2");
    }
    if ((s[1] || '').length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
  },
  /**
   * [获取时间区间]
   * @param  {[type]} type [获取时间区间格式，today今日，week本周,month本月，year今年]
   * @return {[type]}      [description]
   */
  getTimeDistance: (type) => {
    const now = new Date();
    const oneDay = 1000 * 60 * 60 * 24;
    const fixedZero = (val) => {
      return val * 1 < 10 ? `0${val}` : val;
    }
    if (type === 'today') {
      now.setHours(0);
      now.setMinutes(0);
      now.setSeconds(0);
      return [moment(now), moment(now.getTime() + (oneDay - 1000))];
    }
    // 昨日
    if (type === 'yestoday') {
      const last = new Date(Date.parse(now) - oneDay);
      last.setHours(0);
      last.setMinutes(0);
      last.setSeconds(0);
      return [moment(last), moment(last.getTime() + (oneDay - 1000))];
    }
    // 最近7天
    if(type === 'oneWeek') {
      const oneWeekLast = new Date(Date.parse(now) - 1000 * 60 * 60 * 24 * 7);
      now.setHours(0);
      now.setMinutes(0);
      now.setSeconds(0);
      return [moment(oneWeekLast.getTime() + (oneDay - 1000)), moment(now)];
    }
    // 最近14天
    if(type === 'twoWeek') {
      const twoWeekLast = new Date(Date.parse(now) - 1000 * 60 * 60 * 24 * 14);
      now.setHours(0);
      now.setMinutes(0);
      now.setSeconds(0);
      return [moment(twoWeekLast.getTime() + (oneDay - 1000)), moment(now)];
    }
    if (type === 'week') {
      let day = now.getDay();
      now.setHours(0);
      now.setMinutes(0);
      now.setSeconds(0);
      if (day === 0) {
        day = 6;
      } else {
        day -= 1;
      }
      const beginTime = now.getTime() - day * oneDay;
      return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))];
    }
    if (type === 'month') {
      const year = now.getFullYear();
      const month = now.getMonth();
      const nextDate = moment(now).add(1, 'months');
      const nextYear = nextDate.year();
      const nextMonth = nextDate.month();
      return [
        moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
        moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000),
      ];
    }
    if (type === 'year') {
      const year = now.getFullYear();
      return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
    }
  },
}

