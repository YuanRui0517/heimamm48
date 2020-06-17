// 封装一个自己的 axios
import axios from "axios";
import { getToken } from "../utils/mytoken";
// 创建实例
const instance = axios.create({
  baseURL: process.env.VUE_APP_URL,
  withCredentials: true
});
// 再设置拦截器
// 给 axios 添加拦截器
// 请求拦截器
instance.interceptors.request.use(
  function(config) {
    // 在这里将 token 设置到请求拦截器
    // config：当前请求的所有相关信息
    config.headers.token = getToken();
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);
// 响应拦截器
instance.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    return Promise.reject(error);
  }
);
// 导出 axios 实例
// 不需要按需导出：使用默认导出
export default instance;
