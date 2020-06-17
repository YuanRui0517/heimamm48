// 封装两个方法
// 检验手机号
export function checkphone(rule, value, callback) {
  // 定义正则
  var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
  // 验证
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("手机号验证失败"));
  }
}

// 检验邮箱
export function checkemail(rule, value, callback) {
  // 定义正则
  var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  // 验证
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("手机号验证失败"));
  }
}
