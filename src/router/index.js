// Vue构造哈数
import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'

// 注册路由的插件 · 把路由关联到 vue
Vue.use(VueRouter)

// 路由配置
const routes = [
  {
    // 首页
    path: '/',
    component: () => import("@/views/Index")
  },
  {
    // 首页的管理页面
    path: "/category",
    component: () => import("@/views/Category"),
  },
  {
    // 搜索页
    path: "/search",
    component: () => import("@/views/Search"),
  },
  {
    path: "/post/:id",
    component: () => import("@/views/Post"),
  },
  {
    // 登录页
    path: '/login',
    // 除了首页之外的页面，都可以懒加载 - .vue 可以忽略
    component: () => import('@/views/Login'),
  },
  {
    // 注册页
    path: '/register',
    component: () => import('@/views/Register'),
  },
  {
    // 个人中心
    path: '/user',
    component: () => import('@/views/User'),
    // 路由可以通过meta自定义数据，可以选择路由随意加上自己的数据
    // 它的值可以是任意的类型
    meta: {
      // 代表这个页面需要授权
      authorization: true
    },
  },
  {
    // 个人编辑页面
    path: "/user/update",
    component: () => import("@/views/Update"),
    meta: {
      // 代表这个页面需要授权
      authorization: true
    },
  },
  {
    // 我的关注页面
    path: "/user/follow",
    component: () => import("@/views/Follow"),
    meta: {
      // 代表这个页面需要授权
      authorization: true
    },
  },
  {
    // 我的跟帖页面
    path: "/user/comment",
    component: () => import("@/views/Comment"),
    meta: {
      // 代表这个页面需要授权
      authorization: true
    },
  },
  {
    // 我的收藏页面
    path: "/user/collect",
    component: () => import("@/views/Collect"),
    meta: {
      // 代表这个页面需要授权
      authorization: true
    },
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router