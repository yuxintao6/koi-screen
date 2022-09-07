import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/ems.vue')
  }, 
  {
    path: '/ems',
    name: 'ems',
    component: () => import('../views/ems.vue')
  },
  {
    path: '/pcs',
    name: 'pcs',
    component: () => import('../views/pcs.vue')
  }, 
  {
    path: '*',
    name: '/404',
    component: () => import('../views/error/404.vue')
  } 
]

const router = new VueRouter({
  routes
})

export default router
