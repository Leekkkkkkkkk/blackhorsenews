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
