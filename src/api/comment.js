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

// 对评论或评论回复点赞
export const addCommentLike = (target) => {
  return request({
    method: 'post',
    url: '/v1_0/comment/likings',
    data: {
      target
    }
  })
}

// 取消对评论或评论回复点赞
export const delCommentLike = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${target}`
  })
}

// 对文章或者评论进行评论
export const addComment = (data) => {
  return request({
    method: 'post',
    url: '/v1_0/comments',
    data
  })
}
