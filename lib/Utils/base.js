'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * name: 公共方法
 * author: 雏田
 * version: 1.1
 * time: 2018-07-20
 */
exports.default = {
  /**
   * [获取url参数https://a.com?a=1&b=2获取a,b的值]
   * @param  {[type]} name [参数名(a,b)]
   * @return {[type]}      [得到的值(1,2)]
   */
  getQueryString: function getQueryString(name) {
    // 构造一个含有目标参数的正则表达式对象
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    // 匹配目标参数
    // let urls=window.location.search.substr(1);
    var urls = window.location.href.split('?')[1];
    if (urls) {
      var r = urls.match(reg);
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
  FormatDate: function FormatDate(times) {
    var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-MM-dd hh:mm:ss';

    times = new Date(times);
    var date = {
      'M+': times.getMonth() + 1,
      'd+': times.getDate(),
      'h+': times.getHours(),
      'm+': times.getMinutes(),
      's+': times.getSeconds(),
      'q+': Math.floor((times.getMonth() + 3) / 3),
      'S+': times.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
      format = format.replace(RegExp.$1, (times.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? date[k] : ('00' + date[k]).substr(('' + date[k]).length));
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
  FormatPrice: function FormatPrice(number) {
    var isMoney = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var decimals = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
    var thousands_sep = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ',';
    var dec_point = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '.';

    // 先转为元
    if (isMoney) number = (parseInt(number, 10) / 100).toFixed(decimals);else {
      number = parseInt(number, 10);
    }
    number = (number + '').replace(/[^0-9+-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number;
    var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
    var sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep;
    var dec = typeof dec_point === 'undefined' ? '.' : dec_point;
    var s = '';
    var toFixedFix = function toFixedFix(n, prec) {
      var k = Math.pow(10, prec);
      // 防止精度缺失，要加0.5     
      return '' + Math.floor(n * k + 0.5) / k;
    };
    s = (prec ? toFixedFix(n, prec) : '' + Math.floor(n)).split('.');
    var re = /(-?\d+)(\d{3})/;
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
  getTimeDistance: function getTimeDistance(type) {
    var now = new Date();
    var oneDay = 1000 * 60 * 60 * 24;
    var fixedZero = function fixedZero(val) {
      return val * 1 < 10 ? '0' + val : val;
    };
    if (type === 'today') {
      now.setHours(0);
      now.setMinutes(0);
      now.setSeconds(0);
      return [(0, _moment2.default)(now), (0, _moment2.default)(now.getTime() + (oneDay - 1000))];
    }
    if (type === 'week') {
      var day = now.getDay();
      now.setHours(0);
      now.setMinutes(0);
      now.setSeconds(0);
      if (day === 0) {
        day = 6;
      } else {
        day -= 1;
      }
      var beginTime = now.getTime() - day * oneDay;
      return [(0, _moment2.default)(beginTime), (0, _moment2.default)(beginTime + (7 * oneDay - 1000))];
    }
    if (type === 'month') {
      var year = now.getFullYear();
      var month = now.getMonth();
      var nextDate = (0, _moment2.default)(now).add(1, 'months');
      var nextYear = nextDate.year();
      var nextMonth = nextDate.month();
      return [(0, _moment2.default)(year + '-' + fixedZero(month + 1) + '-01 00:00:00'), (0, _moment2.default)((0, _moment2.default)(nextYear + '-' + fixedZero(nextMonth + 1) + '-01 00:00:00').valueOf() - 1000)];
    }
    if (type === 'year') {
      var _year = now.getFullYear();
      return [(0, _moment2.default)(_year + '-01-01 00:00:00'), (0, _moment2.default)(_year + '-12-31 23:59:59')];
    }
  }
};
//# sourceMappingURL=base.js.map