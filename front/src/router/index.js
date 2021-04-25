import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/inventory',
    name: 'Inventory',
    component: () => import('../views/Inventory.vue')
  },
  {
    path: '/Employees',
    name: 'Employees',
    component: () => import('../views/Employee.vue')
  },
  {
    path: '/partners',
    name: 'Partners',
    component: () => import('../views/Partner.vue')
  },
  {
    path: '/home',
    name: 'Transaction',
    component: () => import('../views/Transaction.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router