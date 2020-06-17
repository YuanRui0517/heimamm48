// 用来封装所有首页的网络请求的方法
// 导入 axios
import axios from 'axios'
// 导入操作 token 的方法
import { getToken } from '../utils/mytoken'
// 创始一个 axios 实例对象
const instance = axios.create({
    baseURL: process.env.VUE_APP_URL,
    withCredentials: true
})

// 封装用户信息的接口
export function apiInfo () {
    return instance({
        url: '/info',
        method: 'GET', // 如果请求方式是 get，method 可以省略掉
        headers: {
            token: getToken()
        }
    })
}

// 封装一个退出登录的方法
export function apiLogout () {
    return instance({
        url: '/logout',
        headers: {
            token: getToken()
        }
    })
}
