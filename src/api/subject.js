// 用来封装所有与学科相关的网站请求
// 导入 axios
import axios from "axios";
// 导入接口 token 的方法
import { getToken } from "../utils/mytoken";
// 创建一个 axios 实例
const instance = axios.create({
  baseURL: process.env.VUE_APP_URL,
  withCredentials: true
});

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

// 封装请求学科列表的接口
export function apiGetSubject({ name, page, limit, rid, username, status }) {
  return instance({
    url: "/subject/list",
    // headers: {
    //   token: getToken()
    // },
    params: {
      name: name,
      page: page,
      limit: limit,
      rid: rid,
      username: username,
      status: status
    }
  });
}

// 封装状态切换的接口
export function apiChangeStatus(id) {
  return instance({
    url: "/subject/status",
    method: "POST",
    data: {
      id: id
    }
  });
}

// 封装新增学科的接口
export function apiAddSubject({ rid, name, shortname, intro, remark }) {
  return instance({
    url: "/subject/add",
    method: "POST",
    data: {
      rid: rid, // 学科编号
      name: name, // 学科名称
      short_name: shortname, // 简称
      intro: intro, // 介绍
      remark: remark // 备注
    }
  });
}

// 封装一个提交数据的方法
export function apiEidtSubject({ rid, name, shortname, intro, remark, id }) {
  return instance({
    url: "/subject/edit",
    method: "POST",
    data: {
      rid: rid, // 学科编号
      name: name, // 学科名称
      short_name: shortname, // 简称
      intro: intro, // 介绍
      remark: remark, // 备注
      id: id // 要修改数据的 id
    }
  });
}

// 封装一个删除学科的方法
export function apiDelSubject(id) {
  return instance({
    url: '/subject/remove',
    method: 'POST',
    data: {
      id: id // 删除学科的标识
    }
  })
}
