//导入了vue
import Vue from 'vue'
//导入了 app.vue 根组件
import App from './App.vue'
//导入 router
import router from './router';
//导入 element ui
import Element from 'element-ui';
//导入 element ui的样式
import 'element-ui/lib/theme-chalk/index.css';
//使用element
Vue.use(Element);
Vue.config.productionTip = false

//创建了一个新的vue 实例
new Vue({
    router: router, //将路由对象挂载到vue实例中
    render: h => h(App), //讲根组件app.vue渲染到vue实例中
}).$mount('#app')