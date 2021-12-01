import axios from 'axios'
import { getStorage } from '@/utils/storage.js'
import store from '@/store'

const request = axios.create({
  baseURL: 'http://toutiao-app.itheima.net',
  timeout: 3000
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
