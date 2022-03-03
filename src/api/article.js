/**
 * 文章请求相关模块
 *  */

import request from '@/utils/request'

// 获取文章列表
export const getArticles = (params) => {
  return request({
    method: 'get',
    url: '/v1_0/articles',
    params
  })
}

// 获取新闻详情
export const getArticleById = (articleId) => {
  return request({
    method: 'get',
    url: `/v1_0/articles/${articleId}`
  })
}
