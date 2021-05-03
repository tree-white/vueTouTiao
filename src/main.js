// vue 构造函数
import Vue from 'vue'
// App 组件（以.vue 结尾的文件都是组件）
import App from './App.vue'
// 路由对象
import router from './router'
// 引入 vant-i 组件库
import Vant from 'vant';
// 导入 axios 
import axios from "axios";

// 绑定到原型对象里面，以后就可以在组件中通过 this.$axios 来调用请求方法
// 在组件上的 this.$xxx 都是在 原型对象上的方法
Vue.prototype.$axios = axios;

// 注册 vant 插件 （Vue.use都是用来注册插件的）
Vue.use(Vant);
// 上线环境是否提示信息（忽略）
Vue.config.productionTip = false


// 创建一个根实例
// .$mount('#app') 相当于 el 配置，指定id为app的元素作为模版
new Vue({
  // 路由对象
  router,
  // 加载第一个子组件，最底层的组件，写法是固定的
  render: h => h(App)
}).$mount('#app')
