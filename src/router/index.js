import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index.js'
import { Dialog } from 'vant'

Vue.use(VueRouter)

// 路由表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login/'),
    meta: { requiresAuth: false } // 给路由额外添加数据
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
        component: () => import('@/views/home'),
        meta: { requiresAuth: false }
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa'),
        meta: { requiresAuth: false }
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video'),
        meta: { requiresAuth: false }
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my'),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/'),
    meta: { requiresAuth: false }
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article/'),
    // 将动态路由参数映射到组件中 props 中，无论是访问还是维护性都很方便
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/user-profile'),
    meta: { requiresAuth: true }
  },
  {
    path: '/user/chat',
    name: 'user-chat',
    component: () => import('@/views/user-chat'),
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.path === '/my') {
//     const tokenStr = store.state.user
//     if (tokenStr) {
//       next()
//     } else {
//       next('/login')
//     }
//   } else {
//     next()
//   }
// })

// to:要访问的页面路由信息
// from:来自那个页面的路由信息
// next：放行标记
router.beforeEach((to, from, next) => {
  // 判断页面是否需要登入状态，才能访问
  if (to.meta.requiresAuth) {
    // 校验登入状态，提示用户

    // 如果已登入，则直接通过
    if (store.state.user) {
      return next()
    }

    // 没有登入，提示是否登入
    Dialog.confirm({
      title: '访问提示',
      message: '该功能需要登入，确认登入页'
    })
      .then(() => {
        // 确认执行这里
        next('/login')
      })
      .catch(() => {
        // 取消执行这里，中断路由导航
        next(false)
      })
  } else {
    // 不需要登入状态的页面，直接放行
    next()
  }
})

export default router
