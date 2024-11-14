import { createRouter, createWebHistory } from 'vue-router'

// 创建路由使用 createRouter()
// 路由模式：
// 1. history 模式使用 createWebHistory()  地址栏不带#
// 2. hash 模式使用 createWebHashHistotry()  地址栏带#
// 3. 参数是基础路径，默认是 /

// import.meta.env.BASE_URL 这个是 vite中的环境变量 就是 vite.config.js 中的 base 配置项

// console.log(import.meta.env.DEV)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') }, // 登陆页
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContanier.vue'),
      redirect: '/article/manage',
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/article/ArticleManage.vue')
        },
        {
          path: '/article/channel',
          component: () => import('@/views/article/ArticleChannel.vue')
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue')
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue')
        }
      ]
    }
  ]
})

export default router
