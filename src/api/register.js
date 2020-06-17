// 用来封装与注册相关的网络请求
// 导入 axios
import axios from "axios";
// 导出一个方法：得到验证码的方法
export function apiGetCode({ code, phone }) {
  // 将网络请求的结果返回给外界
  return axios({
    url: process.env.VUE_APP_URL + `/sendsms`,
    method: "POST",
    data: {
      code: code,
      phone: phone
    },
    // 一定要注意
    withCredentials: true
  });
}

// 导出一个方法：用来注册用户
export function apiRegister({
  username,
  phone,
  email,
  avatar,
  password,
  rcode
}) {
  return axios({
    url: process.env.VUE_APP_URL + '/register',
    method: "POST",
    data: {
      username: username,
      phone: phone,
      email: email,
      avatar: avatar,
      password: password,
      rcode: rcode
    }
  });
}
