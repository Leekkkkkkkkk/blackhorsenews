import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import Video from '@/views/Video'
import Qa from '@/views/Qa'
import Profile from '@/views/Profile'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        component: Home
      },
      {
        path: '/video',
        component: Video
      },
      {
        path: '/qa',
        component: Qa
      },
      {
        path: '/profile',
        component: Profile
      }
    ]
  },
  {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
