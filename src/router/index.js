//导入了vue
import Vue from 'vue'
//使用vue-router
import VueRouter from 'vue-router';
//导入login 组件
import Login from '../views/login/index.vue';
//导入useElement 组件
import UseElement from '../views/useElement/index.vue';

//注册
Vue.use(VueRouter)
Vue.use(UseElement)

//创建了一个新的vue 实例
var router = new VueRouter({
    routes: [
        { path: '/login', component: Login },
        { path: '/useElement', component: UseElement }
    ]
})


export default router