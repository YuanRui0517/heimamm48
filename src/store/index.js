// 使用 vuex
import Vue from 'vue'
// 导入 vuex
import Vuex from 'vuex'
// 使用 vuex
Vue.use(Vuex)
// 创建一个 store 对象
const store = new Vuex.Store({
    // 管理状态
    state: {
        username: '',
        userimg: '',
        role: '' // 用户角色
    },
    // 修改 state
    mutations: {
        // 定义一个设置用户信息的方法
        setUserInfo: function (state, payload) {
            // payload: 有两个属性 用户名 & 用户头像
            state.username = payload.username
            state.userimg = payload.userimg
        },
        // 定义一个设置用户角色的方法
        setRole: function (state, payload) {
            state.role = payload
        }
    }
})
// 暴露对象
export default store
