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
/**
 * 获取所有频道
 * @returns
 */
export function getUserchannels () {
  return request({
    url: '/v1_0/user/channels'
  })
}
/**
 *设置用户频道列表
 * @param {*} channel {id, seq}
 * @returns
 */
export function UserchannelsItem (channel) {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [channel]
    }
  })
}
/**
 *删除用户频道
 * @param {*} id {id}
 * @returns
 */
export function RemovehannelsItem (id) {
  return request({
    url: `/v1_0/user/channels/${id}`,
    method: 'DELETE'
  })
}
