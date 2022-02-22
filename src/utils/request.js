// 请求模块

import axios from 'axios'

// 在非组件模块中获取store 必须通过这种方式
// 单独加载store是组件里面this.$store 一个东西
import store from '@/store'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net' // 接口的基准路径
})

// 请求拦截器
request.interceptors.request.use(
  function (config) {
    const { user } = store.state
    // 如果用户已登入，统一给接口设置 token信息
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    // 处理完之后一定要把config 返回，否则请求就会停在这里
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 响应拦截器

export default request
