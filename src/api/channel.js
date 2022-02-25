/* *
 * 频道相关请求模块
 */
import request from '@/utils/request.js'

// 获取全局频道列表
export const getAllChannels = () => {
  return request({
    method: 'get',
    url: '/v1_0/channels'
  })
}
