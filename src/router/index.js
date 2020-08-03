import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home/index')
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
]

const router = new VueRouter({
  routes
})

export default router
