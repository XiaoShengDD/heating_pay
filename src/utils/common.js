/**
 * 通用js方法封装处理
 * Copyright (c) 2019 ruoyi
 */

// 访问服务器地址
const SERVER_ADDRESS = "http://118.31.125.162:2001/v1"
export {
  SERVER_ADDRESS
}

export function font_size() {
  var pwidth = 750
  var prem = 100

  getRem(pwidth, prem)
  //rem.js 自适应css
  // window.onload = function(){
  // 	// 375为设计师尺寸  分为100份
  //     getRem(375,100)
  // };
  window.onresize = function () {
    getRem(pwidth, prem)
  }

  function getRem(pwidth, prem) {
    var html = document.getElementsByTagName("html")[0]
    var oWidth =
      document.body.clientWidth || document.documentElement.clientWidth
    html.style.fontSize = (oWidth / pwidth) * prem + "px"
  }
}

export function toThousands(num) {
  var result = [], counter = 0;
  num = (num || 0).toString().split('');
  for (var i = num.length - 1; i >= 0; i--) {
    counter++;
    result.unshift(num[i]);
    if (!(counter % 3) && i != 0) { result.unshift(','); }
  }
  return result.join('');
}

// 日期格式化
export function parseTime(time, pattern) {
  if (arguments.length === 0) {
    return null;
  }
  const format = pattern || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (typeof time === "string" && /^[0-9]+$/.test(time)) {
      time = parseInt(time);
    }
    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    if (result.length > 0 && value < 10) {
      value = "0" + value;
    }
    return value || 0;
  });
  return time_str;
}

// 表单重置
export function resetForm(refName) {
  if (this.$refs[refName] !== undefined) {
    this.$refs[refName].resetFields();
  }
}

// 添加日期范围
export function addDateRange(params, dateRange) {
  var search = params;
  if (null != dateRange) {
    search.params = {
      beginTime: this.dateRange[0],
      endTime: this.dateRange[1]
    };
  }
  return search;
}

// 回显数据字典
export function selectDictLabel(datas, value) {
  var actions = [];
  Object.keys(datas).map(key => {
    if (datas[key].dictValue == "" + value) {
      actions.push(datas[key].dictLabel);
      return false;
    }
  });
  return actions.join("");
}

// 通用下载方法
export function download(fileName) {
  window.location.href =
    SERVER_ADDRESS +
    "/common/download?fileName=" +
    encodeURI(fileName) +
    "&delete=" +
    true;
}

// 字符串格式化(%s )
export function sprintf(str) {
  var args = arguments,
    flag = true,
    i = 1;
  str = str.replace(/%s/g, function () {
    var arg = args[i++];
    if (typeof arg === "undefined") {
      flag = false;
      return "";
    }
    return arg;
  });
  return flag ? str : "";
}

//普通字符转换成转意符
export function html2Escape(str) {
  return str.replace(/[<>&"]/g, function (c) {
    return {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      '"': "&quot;"
    }[c];
  });
}

/* eslint-disable */
export function getUrlKey(str) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
}



export function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) { return pair[1]; }
  }
  return (false);
}