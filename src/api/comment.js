/*
 * 文章评论相关请求模块
 */
import request from '@/utils/request'

// 获取评论或评论回复
export const getComments = (params) => {
  return request({
    method: 'get',
    url: '/v1_0/comments',
    params
  })
}
