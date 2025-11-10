import { createRouter, createWebHistory } from 'vue-router'
import ConnexionCompo from '@/components/ConnexionCompo.vue'
import CreationUser from '@/components/CreationUser.vue'
import HomePage from '@/components/HomePage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/connexion', component: ConnexionCompo },
  { path: '/creationUser', component: CreationUser },
  { path: '/homePage/${firstname}', component: HomePage },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
