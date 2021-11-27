import axios from 'axios'
import { getStorage } from '@/utils/storage.js'

const request = axios.create({
  baseURL: 'http://toutiao-app.itheima.net',
  timeout: 3000
})

request.interceptors.request.use((config) => {
  if (getStorage('tt-user')) {
    config.headers.Authorization = 'Bearer ' + getStorage('tt-user').token
  }
  return config
})
export default request
