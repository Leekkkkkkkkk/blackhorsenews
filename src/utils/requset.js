import axios from 'axios'
import { getStorage } from '@/utils/storage.js'
import store from '@/store'
import JSONBig from 'json-bigint'
const request = axios.create({
  baseURL: 'http://toutiao-app.itheima.net',
  timeout: 3000,
  transformResponse: [function (data) {
    try {
      return JSONBig.parse(data)
    } catch (error) {
      return data
    }
  }]
})

request.interceptors.request.use((config) => {
  if (getStorage('tt-user')) {
    config.headers.Authorization = 'Bearer ' + store.state.user.token
  }
  return config
})
request.interceptors.response.use((res) => {
  return res.data.data
})
export default request
