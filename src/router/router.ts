import { createRouter, createWebHistory } from 'vue-router'
import ConnexionCompo from '@/components/ConnexionCompo.vue'
import CreationUser from '@/components/CreationUser.vue'
import HomePage from '@/components/HomePage.vue'
import AddFurniture from '@/components/AddFurniture.vue'
import HomePageAdmin from '@/components/HomePageAdmin.vue'
import { useAuthStore } from '@/stores/auth'
import AdminProfile from '@/components/AdminProfile.vue'
import UserProfile from '@/components/UserProfile.vue'
import HomePageUser from '@/components/HomePageUser.vue'

const routes = [
  // 🏠 Page d'accueil publique
  {
    path: '/',
    name: 'Accueil',
    component: HomePage,
  },

  // 🔐 Auth
  {
    path: '/connexion',
    name: 'Connexion',
    component: ConnexionCompo,
  },
  {
    path: '/creationUser',
    name: 'CreationUser',
    component: CreationUser,
  },

  // 👤 Espace utilisateur
  {
    path: '/user',
    name: 'User',
    redirect: '/user/homepage',
    children: [
      { path: 'homepage', component: HomePageUser },
      { path: 'furniture/sell', component: AddFurniture },
      { path: 'already-sell-furniture', component: AddFurniture },
      { path: 'profile', component: UserProfile },
    ],
  },

  // 🧑‍💼 Espace admin
  {
    path: '/admin',
    name: 'Admin',
    redirect: '/admin/homepage',
    children: [
      { path: 'homepage', component: HomePageAdmin },
      { path: 'profile', component: AdminProfile },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// ✅ Guard d’accès
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  const isLogged = auth.isLoggedIn
  const role = auth.role

  const publicPages = ['/', '/connexion', '/creationUser']
  const isPublic = publicPages.includes(to.path)

  // Si non connecté et page non publique → redirection vers /connexion
  if (!isLogged && !isPublic) {
    return next('/connexion')
  }

  // Si admin va sur une page user → redirection
  if (role === 'ADMIN' && to.path.startsWith('/user')) {
    return next('/admin/homepage')
  }

  // Si user va sur une page admin → redirection
  if (role === 'USER' && to.path.startsWith('/admin')) {
    return next('/user/homepage')
  }

  next()
})

export default router
