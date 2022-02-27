import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login/')
  },
  {
    // 一级路由渲染到根组件中的 router-view
    path: '/',
    // name: 'layout'  如果父路由有默认子路由，那他的name 没有意义了
    component: () => import('@/views/layout'),
    children: [
      {
        path: '', // 留空 默认子路由,只能有1个
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/')
  }
]

const router = new VueRouter({
  routes
})

export default router
