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
