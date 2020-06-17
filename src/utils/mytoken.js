// 封装所有用来处理 localstorage 的方法

// 定义一个统一的 key
const TOKEN_KEY = 'heimamm'
// 设置 token
export function setToken (value) {
    // 将 value 对象转为字符串
    // var strValue = JSON.stringify(value)
    window.localStorage.setItem(TOKEN_KEY, value)
}

// 获取 token
export function getToken () {
    // 重点：当取出内容时，需要将内容返回给外界
    return window.localStorage.getItem(TOKEN_KEY)
}

// 删除 token
export function removeToken () {
    window.localStorage.removeItem(TOKEN_KEY)
}
