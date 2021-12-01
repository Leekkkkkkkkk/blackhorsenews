import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dayjs from 'dayjs'
// 字体图标引入
import '@/style/toutiaoicon.css'
// 解决rem适配
import 'amfe-flexible'

import Vant from 'vant'
import 'vant/lib/index.css'
import './style/index.less'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn' // ES 2015
dayjs.locale('zh-cn') // 全局使用
dayjs.extend(relativeTime)
Vue.use(Vant)
Vue.filter('relativeTime', (val) => {
  return dayjs().to(val)
})
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
