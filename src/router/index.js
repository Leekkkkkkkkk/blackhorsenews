import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import Video from '@/views/Video'
import Qa from '@/views/Qa'
import Profile from '@/views/Profile'
import Search from '@/views/Search'
import Detail from '@/views/Detail'
import User from '@/views/User'
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
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/user',
    component: User
  },
  {
    path: '/detail/:artId',
    name: 'detail',
    component: Detail,
    props: true
  }

]

const router = new VueRouter({
  routes
})

export default router
