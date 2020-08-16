import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home/index')
  },
  {
    path: '/des/:id',
    name: 'des',
    component: () => import('@/views/Home/des')
  },
  {
    path: '/pay',
    name: 'Pay',
    component: () => import('@/views/Pay/index')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('@/views/User/index')
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('@/views/List/index')
  },
  {
    path: '/failure',
    name: 'Failure',
    component: () => import('@/views/PayType/failure')
  },
  {
    path: '/success',
    name: 'Success',
    component: () => import('@/views/PayType/success')
  },
  {
    path: '/defray',
    name: 'Defray',
    component: () => import('@/views/PayType/defray')
  },
  {
    path: '/payInfo',
    name: 'PayInfo',
    component: () => import('@/views/PayType/payInfo')
  },
]

const router = new VueRouter({
  routes
})

export default router
