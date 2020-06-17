// 导入 vue
import Vue from "vue";
// 导入 moment
import moment from "moment";
// 创建一个全局过滤器
Vue.filter("mytime", function(value) {
  return moment(value).format("YYYY-DD-MM");
});
