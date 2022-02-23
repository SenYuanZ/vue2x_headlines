// 用户相关请求模块

import request from '@/utils/request'

// 登入请求
export const login = (data) => {
  return request.post('/v1_0/authorizations', data)
}

// 发送验证请求 注意：每个手机号1分钟一次
export const sendSms = (mobile) => {
  return request.get(`/v1_0/sms/codes/${mobile}`)
}

// 获取登入用户信息
export const getCurrentUser = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
    /* headers: {
      Authorization: `Bearer ${store.state.user.token}`
    } */
  })
}

// 获取用户频道列表
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}
