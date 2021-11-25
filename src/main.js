import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 字体图标引入
import '@/style/toutiaoicon.css'
// 解决rem适配
import 'amfe-flexible'

import Vant from 'vant'
import 'vant/lib/index.css'
import './style/index.less'

Vue.use(Vant)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
