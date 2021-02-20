import { createRouter, createWebHistory } from 'vue-router'

import Home from '~/views/Home.vue'
import Goal from '~/views/Goal.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/goals/:id', component: Goal },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
