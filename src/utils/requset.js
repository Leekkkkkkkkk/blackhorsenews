import axios from 'axios'

const requset = axios.create({
  baseURL: 'http://toutiao-app.itheima.net',
  timeout: 3000
})

export default requset
