// 封装所有与企业相关的网络请求
// 导入自己封装的 axios
import instance from "../utils/myhttp";

// 封装接口：
// 获取企业列表
export function apiGetList({ name, page, limit, eid, username, status }) {
  return instance({
    url: "/enterprise/list",
    method: "GET",
    // 由于请求方式是 get,参数应该放到 params 中
    params: {
      name: name,
      page: page,
      limit: limit,
      eid: eid,
      username: username,
      status: status
    }
  });
}

// 添加企业
export function apiAddEnt({ eid, name, short_name, intro, remark }) {
  return instance({
    url: "/enterprise/add",
    method: "POST",
    // 由于请求方式是 post，参数应该放到 data 中
    data: {
      eid: eid,
      name: name,
      short_name: short_name,
      intro: intro,
      remark: remark
    }
  });
}

// 修改企业状态
export function apiEditEnt(id) {
  return instance({
    url: "/enterprise/status",
    method: "POST",
    data: {
      id: id
    }
  });
}

// 删除企业
export function apiDelEnt(id) {
  return instance({
    url: "/enterprise/remove",
    method: "POST",
    data: {
      id: id
    }
  });
}

// 修改企业数据
export function apiUpdateEnt({ id, name, eid, short_name, intro, remark }) {
  return instance({
    url: "/enterprise/edit",
    method: "POST",
    data: {
      id: id,
      name: name,
      eid: eid,
      short_name: short_name,
      intro: intro,
      remark: remark
    }
  });
}
