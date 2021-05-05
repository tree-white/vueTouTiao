// Vue构造哈数
import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'

// 注册路由的插件 · 把路由关联到 vue
Vue.use(VueRouter)

// 路由配置
const routes = [{
    path: '/login',
    // 除了首页之外的页面，都可以懒加载 - .vue 可以忽略
    component: () => import('@/views/Login'), // 登录页
  },
  {
    path: '/register',
    component: () => import('@/views/Register'), // 注册页
  },
  {
    path: '/user',
    component: () => import('@/views/User'), // 注册页
  },
  {
    path: "/user/update",
    component: () => import("@/views/Update"), // 个人编辑页面
  },
  {
    path: "/user/follow",
    component: () => import("@/views/Follow"), // 我的关注页面
  },
  {
    path: "/user/comment",
    component: () => import("@/views/Comment"), // 我的跟帖页面
  },
  {
    path: "/user/collect",
    component: () => import("@/views/Collect"), // 我的收藏页面
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router