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

/**
 *关注用户
 * @param {*} target 关注用户的id
 */
export function followUser (target) {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target: target
    }
  })
}
/**
 *取消关注
 * @param {*} target 取消关注用户的id
 */
export function deleteFollow (target) {
  return request({
    url: '/v1_0/user/followings/' + target,
    method: 'DELETE'
  })
}
/**
 *获取评论列表
 * @param {*} params type source offset limit
 * @returns
 */
export function getCommentList (params) {
  return request({
    url: '/v1_0/comments',
    params
  })
}
/**
 *获取用户资料
 * @returns
 */
export function getUserProfile () {
  return request({
    url: '/v1_0/user/profile'
  })
}

/**
 *
 * @param {*} data {}更新用户需要的数据
 * @returns
 */
export function updateUserProfile (data) {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}
/**
 *
 * @param {} data form data
 * @returns
 */
export function updateUserPhoto (data) {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data
  })
}
