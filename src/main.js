// 导入了 vue
import Vue from "vue";
// 导入了 App.vue （根组件）
import App from "./App.vue";
// 导入 router
import router from "./router";
// 导入 elementui
import Element from "element-ui";
// 导入 elementui 的样式
import "element-ui/lib/theme-chalk/index.css";
// 导入全局样式
import "./style/index.css";
// 导入 store
import store from "./store/index";
// 导入自己的过滤器
import "./filters/timefilter.js";
// 导入全局组件 subject & ent
import subject from "./components/subjectcom.vue";
import ent from "./components/ent.vue";
// 导入全局组件 mycity
import mycity from "./components/mycity.vue";
// 导入富文本编辑框
import VueQuillEditor from "vue-quill-editor";
import "quill/dist/quill.core.css"; // import styles
import "quill/dist/quill.snow.css"; // for snow theme
import "quill/dist/quill.bubble.css"; // for bubble theme

// 使用富文本编辑框
Vue.use(VueQuillEditor)
// 使用 element
Vue.use(Element);
Vue.config.productionTip = false;

// 将这两个组件设置为全局组件：全局组件一旦导入可以在任意页面中使用，不需要做其它任何操作
Vue.component("subjectcom", subject); // 一次只注册一个组件
Vue.component("entcom", ent);
Vue.component("mycity", mycity);

// 创建了一个新的 vue 实例
new Vue({
  router: router, // 将路由对象挂载到 vue 实例中
  store: store, // 将 vuex 挂载到 vue 实例中
  render: h => h(App) // 将根组件 App.vue 中的内容渲染到 vue 实例中
}).$mount("#app");
