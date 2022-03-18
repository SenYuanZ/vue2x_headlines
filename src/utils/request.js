// 请求模块
import axios from 'axios'

// 在非组件模块中获取store 必须通过这种方式
// 单独加载store是组件里面this.$store 一个东西
import store from '@/store'
import { Toast } from 'vant'
import router from '@/router/'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net' // 接口的基准路径
})

const refreshTokenReq = axios.create({
  baseURL: 'http://toutiao.itheima.net'
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
request.interceptors.response.use(
  function (response) {
    // 响应成功进入这里

    return response
  },
  async function (error) {
    // 请求响应失败进入这里
    // 超过 2xx 的状态码都会进入这里

    const status = error.response.status
    if (status === 400) {
      // 客户端请求参数错误
      Toast.fail('客户端请求参数异常')
    } else if (status === 401) {
      // token 无效
      // 如果没有 user 或者 user.token ，直接去登入
      const { user } = store.state
      if (!user || user.token) {
        // 直接跳转到登入页
        return redirectLogin()
      }

      // 使用 refresh_token,请求获取新的 token
      try {
        const { data } = await refreshTokenReq({
          method: 'PUT',
          url: '/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${user.refresh_token}`
          }
        })

        // 拿到新的 token 之后把他更新到容器中
        user.token = data.data.token
        store.commit('setUser', user)

        // 把失败的请求重新发出去
        // error.config 是本次请求的相关配置信息对象
        // 这里使用 request 发请求，他会走自己的拦截器
        // 她会请求拦截器中通过 store 容器访问 token数据
        return request(error.config)
      } catch (err) {
        // 刷新token 都失败了，直接跳转登入页
        redirectLogin()
      }
    } else if (status === 403) {
      // 没有权限
      Toast.fail('没有权限操作')
    } else if (status >= 500) {
      // 服务端异常
      Toast.fail('服务端异常，请稍后重试')
    }
    // 抛出异常
    return Promise.reject(error)
  }
)

function redirectLogin () {
  router.replace('/login')
}

export default request
