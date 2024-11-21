import { useUserStore } from '@/stores'
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

// 登陆访问的拦截 => 默认是直接放行的
// 根据返回值决定，是放行还是拦截
// 返回值：
// 1. 如果是undefined / true 直接放行
// 2. false 拦回 from 的地址的页面
// 3. 具体路径 或 路径对象 拦截到对应的地址去
//      例如： '/login'   {name:'login'}
router.beforeEach((to) => {
  // 如果没有token，且访问的是非登录页，拦截到登陆，其他情况正常放行
  const useToken = useUserStore()
  if (!useToken.token && to.path !== '/login') return '/login'
})

export default router
