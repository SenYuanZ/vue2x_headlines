/* *
 搜索请求相关模板
*/
import request from '@/utils/request.js'

// 获取搜索联想建议
export const getSearchSuggestions = (q) => {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q // 联想建议搜索关键词
    }
  })
}

// 获取搜索结果
export const getSearchResult = (params) => {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params
  })
}
