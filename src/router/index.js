// Vue构造哈数
import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'

// 注册路由的插件 · 把路由关联到 vue
Vue.use(VueRouter)

// 路由配置
const routes = [
  {
    path: '/login',
    // 除了首页之外的页面，都可以懒加载
    // .vue 可以忽略
    component: () => import('@/views/Login')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
