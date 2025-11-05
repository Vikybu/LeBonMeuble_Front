import { createRouter, createWebHistory } from 'vue-router'
import ConnexionCompo from '@/components/ConnexionCompo.vue'

const routes = [{ path: '/', component: ConnexionCompo }]

export default createRouter({
  history: createWebHistory(),
  routes,
})
