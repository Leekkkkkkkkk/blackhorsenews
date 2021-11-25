import requset from '@/utils/requset'
/**
 *获取验证码
 * @param {*} mobile 手机号
 * @returns promise
 */
export function getCode (mobile) {
  return requset({
    url: '/v1_0/sms/codes/' + mobile
  })
}
/**
 *登录
 * @param {*} data  {mobile,code}
 * @returns promise
 */
export function login (data) {
  return requset({
    url: '/v1_0/authorizations',
    method: 'POST',
    data
  })
}
