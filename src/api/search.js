import request from '@/utils/requset'
/**
 *联想关键词
 * @param {*} q 联想关键词
 * @returns
 */
export function getSearchSuggestion (q) {
  return request({
    url: '/v1_0/suggestion',
    method: 'GET',
    params: {
      q
    }
  })
}
/**
 *搜索的数据
 * @param {*} params {page,per_page,q}
 *
 */
export function getSearchResults (params) {
  return request({
    url: '/v1_0/search',
    method: 'GET',
    params
  })
}
