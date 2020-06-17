// 导入 Vue
import Vue from "vue";
// 导入 vue-router
import VueRouter from "vue-router";
// 导入 login 组件
import Login from "../views/login/index.vue";
// 导入 useElement 组件
import UseElement from "../views/useElement/index.vue";
// 导入 index 组件
import Index from "../views/index/index.vue";
// 导入 child
import child from "./childRouter.js";

// 导入 token 的操作方法
import { getToken } from "../utils/mytoken.js";
// 导入得到用户信息的方法
import { apiInfo } from "../api/index.js";

// 导入 message 提示框
import { Message } from "element-ui";

// 导入 nprogress
// 导入脚本
import NProgress from "nprogress";
// 导入样式
import "nprogress/nprogress.css";

// 导入 store
import store from "../store/index.js";

// 使用 vue-router
Vue.use(VueRouter);
// 创建一个新的 vue-router 对象
var router = new VueRouter({
  // 添加路由的规则
  routes: [
    // 路由重定向
    { path: "/", redirect: "/login" },
    // 登录
    {
      path: "/login",
      component: Login,
      meta: {
        roles: ["超级管理员", "管理员", "老师", "学生"]
      }
    },
    // 使用 element 的路由规则
    {
      path: "/useElement",
      component: UseElement,
      meta: {
        roles: ["超级管理员", "管理员", "老师", "学生"]
      }
    },
    // 设置首页路由
    {
      path: "/index",
      component: Index,
      meta: {
        roles: ["超级管理员", "管理员", "老师", "学生"]
      },
      children: child
    }
  ]
});

// 添加一个全局前置导航守卫：当路由发生改变之前会执行
// to：要跳转的目标路由
// from：当前跳转来源的路由
// next：是否继续执行后续的代码
router.beforeEach((to, from, next) => {
  // 得到 title 属性
  const title = to.meta.title;
  // 如果 title 存在，设置给 document.body
  if (title) {
    document.title = title;
  }
  // 开启进度条
  NProgress.start();
  // 判断是否请求的是登录页面
  if (to.path !== "/login") {
    // 判断是否存在 token
    if (!getToken()) {
      // 提示用户未登录
      Message.error("您还没有登录");
      // 关闭进度条
      NProgress.done();
      // 跳转到登录页面
      next("/login");
      // this.$router.push('/login') // 错误的
      // 注意点：这里并不能够使用 this ，之所以以前可以通过 this.$router.push 进行跳转
      // 是因为代码书写在 .vue 文件中， .vue 文件中的 this. 指向的是 vue 实例。
      // 而现在是在一个 js 文件中，是无法通过 this 得到 vue 实例
    } else {
      // 判断 token 是否为真
      apiInfo().then(res => {
        // 得到用户的信息
        // 判断当前用户是否在于禁用状态
        if (res.data.data.status === 0) {
          Message.error("帐号已被禁用，请出联系管理员");
          // 关闭进度条
          NProgress.done();
        } else {
          // 判断状态
          if (res.data.code === 200) {
            // 创建一个用户信息对象
            var userInfo = {};
            // 设置用户名
            userInfo.username = res.data.data.username;
            // 设置用户头像
            userInfo.userimg =
              process.env.VUE_APP_URL + "/" + res.data.data.avatar;
            // 调用 mutations 中的方法
            // this.$store.commit('setUserInfo', userInfo) // 不对的
            store.commit("setUserInfo", userInfo);
            // 得到当前登录系统的用户角色
            const role = res.data.data.role;
            // 将用户角色保存到 vuex 中
            store.commit("setRole", role);
            // 判断当前访问的路由权限中是否保存 role
            // console.log(to.meta.roles)
            if (to.meta.roles.includes(role)) {
              // 说明当前角色有访问本路由的权限
              next();
            } else {
              // 说明当前角色没有访问本路由的权限
              Message.error("对不起，您没有访问本路由的权限");
              // 关闭进度条
              NProgress.done();
            }
          } else if (res.data.code === 206) {
            // 提示用户
            Message.error("您还没有登录");
            // 关闭进度条
            NProgress.done();
            // 说明 token 为假
            next("/login");
          }
        }
      });
    }
  } else {
    // 执行后续的代码
    next();
  }
});

// 添加一个全局后置钩子：路由发生改变之后执行
router.afterEach(() => {
  // 关闭进度条
  NProgress.done();
});

// 将新的对象暴露出去
export default router;
