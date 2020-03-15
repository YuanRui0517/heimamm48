//导入了vue
import Vue from 'vue'
//使用vue-router
import VueRouter from 'vue-router';

import Login from '../views/login/index.vue';


//注册
Vue.use(VueRouter)
    // Vue.use(Element)

//创建了一个新的vue 实例
var router = new VueRouter({
    routes: [
        { path: '/login', component: Login }
    ]
})


export default router