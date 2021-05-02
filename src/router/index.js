// Vue构造哈数
import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'
// 导入组件 · home 是一个普通组件
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // 组件的懒加载，当访问 /about 页面的时候才导入加载这个 js 文件页面
    component: () => import('../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
