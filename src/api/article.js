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
/**
 *获取频道
 * @param {*} params
 * @returns
 */
export function getChannels (params) {
  return request({
    url: '/v1_0/channels',
    params
  })
}
/**
 *获取文章详情
 * @param {*} id {文章id}
 *
 */
export function getArticleDetail (id) {
  return request({
    url: `/v1_0/articles/${id}`
  })
}
/**
 *收藏文章
 * @param {*} id 文章id
 */
export function addCollectArticle (target) {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target
    }
  })
}
/**
 *取消收藏
 * @param {*} id 文章id
 * @returns
 */
export function deleteCollectArticle (id) {
  return request({
    url: '/v1_0/article/collections/' + id,
    method: 'DELETE'
  })
}
