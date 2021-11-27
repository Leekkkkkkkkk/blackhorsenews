import request from '@/utils/requset'
/**
 *获取验证码
 * @param {*} mobile 手机号
 * @returns promise
 */
export function getCode (mobile) {
  return request({
    url: '/v1_0/sms/codes/' + mobile
  })
}
/**
 *登录
 * @param {*} data  {mobile,code}
 * @returns promise
 */
export function login (data) {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data
  })
}
export function getUserSelfInfo () {
  return request({
    url: '/v1_0/user'
  })
}
