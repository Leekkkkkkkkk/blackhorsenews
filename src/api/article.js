import request from '@/utils/requset'
/**
 *获取推荐文章
 * @param {*} params
 * {channel_id,timestamp,with_top}
 */
export function getArticle (params) {
  return request({
    url: '/v1_1/articles',
    params
  })
}

export function getChannels (params) {
  return request({
    url: '/v1_0/channels',
    params
  })
}
