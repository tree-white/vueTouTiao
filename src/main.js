// vue 构造函数
import Vue from 'vue';
// App 组件（以.vue 结尾的文件都是组件）
import App from './App.vue';
// 路由对象
import router from './router';
// 引入 vant-ui 组件库
import Vant, {
  Dialog,
  Toast
} from 'vant';
// 导入 axios 
import axios from "axios";

// 创建一个根实例 - 把匿名创建的匿名函数Vue赋值给app
let app;

// 绑定到原型对象里面，以后就可以在组件中通过 this.$axios 来调用请求方法
// 在组件上的 this.$xxx 都是在 原型对象上的方法
Vue.prototype.$axios = axios;

// 给 axios 添加基地址，添加后请求的url就会自动拼接这个基地址(本地数据库)
// axios.defaults.baseURL = 'http://localhost:3000';

// 线上数据库
axios.defaults.baseURL = 'http://192.168.1.10:3000';

// 注册 Vant 插件 （Vue.use都是用来注册插件的）
Vue.use(Vant);

// 上线环境是否提示信息（忽略）
Vue.config.productionTip = false;

// 添加路由的守卫
// tp：代表即将要访问的页面
// from：代表将要离开的页面
// next：必须要调用，让中间件继续执行后面的内容。
router.beforeEach((to, from, next) => {
  localStorage.setItem('fromPath', from.path)
  // 需要验证的页面
  // console.log(to.meta.authorization);
  if (to.meta.authorization) {
    // 把本地存储的登录数据获取下来
    const loginData = JSON.parse(localStorage.getItem('userInfo')) || {};
    // 判断是否有 token 内容
    if (loginData.token) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
})

// axios的响应拦截器(interceptors)
// 文档地址：https://github.com/axios/axios#interceptors
axios.interceptors.response.use(response => {
  // console.log(response);
  return response;
}, error => {
  // 如果请求返回的结果是错误的，就会进入到错误的处理函数中
  // error 是 js 原生的错误对象，可以通过(error.response)获取到详细的错误信息
  const {
    message,
    statusCode
  } = error.response.data
  if (statusCode === 400) {
    Toast.fail(message);
  }

  // 如果状态码是(403)，就表示(token)是错的或者没有传(token)或过期
  if (statusCode === 403) {
    // 服务器返回的提示
    // Toast.fail(message);

    // 自定义弹框提示
    Dialog.confirm({
        title: '登录提示',
        message: '需登录后才可操作！',
      })
      .then(() => {
        // 点击了确定
        app.$router.push({
          // 跳转到登录页
          // 跳转到登录页，push方法的参数除了可以直接写一个字符串，还可以写一个对象
          // 对象里面的path属性表示路径，query表示问号的参数
          // 比如这完整的路径其实是：/login?return_url=/post/8
          path: "/login",
          query: {
            return_url: app.$route.path
          }
        })
      })



  }

  return Promise.reject(error)
});

// 创建一个根实例
// .$mount('#app') 相当于 el 配置，指定id为app的元素作为模版
app = new Vue({
  // 路由对象
  router,
  // 加载第一个子组件，最底层的组件，写法是固定的
  render: h => h(App)
}).$mount('#app');