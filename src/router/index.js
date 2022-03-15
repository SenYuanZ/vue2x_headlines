import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index.js'

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
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article/'),
    // 将动态路由参数映射到组件中 props 中，无论是访问还是维护性都很方便
    props: true
  },
  {
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/user-profile')
  },
  {
    path: '/user/chat',
    name: 'user-chat',
    component: () => import('@/views/user-chat')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/my') {
    const tokenStr = store.state.user
    if (tokenStr) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
