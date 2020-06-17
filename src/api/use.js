// 封装所有与用户相关的网络请求
import instance from "../utils/myhttp";

// 得到用户信息列表
export function apiGetUserList({ username, email, role_id, page, limit }) {
  return instance({
    url: "/user/list",
    params: {
      username: username,
      email: email,
      role_id: role_id,
      page: page,
      limit: limit
    }
  });
}

// 新增用户
export function apiAddUser({
  username,
  email,
  phone,
  role_id,
  status,
  remark
}) {
  return instance({
    url: "/user/add",
    method: "POST",
    data: {
      username: username,
      email: email,
      phone: phone,
      role_id: role_id,
      status: status,
      remark: remark
    }
  });
}

// 修改用户状态
export function apiChangeStatus(id) {
  return instance({
    url: "/user/status",
    method: "POST",
    data: {
      id: id
    }
  });
}
// 删除用户
export function apiDelUser(id) {
  return instance({
    url: "/user/remove",
    method: "POST",
    data: {
      id: id
    }
  });
}

// 修改用户
export function apiUpdateUser({
  id,
  username,
  phone,
  email,
  avatar,
  password,
  remark,
  status,
  role_id
}) {
  return instance({
    url: "/user/edit",
    method: "POST",
    data: {
      id: id,
      username: username,
      phone: phone,
      email: email,
      avatar: avatar,
      password: password,
      remark: remark,
      status: status,
      role_id: role_id
    }
  });
}
