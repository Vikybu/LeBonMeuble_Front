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
import FurnitureOnSell from '@/components/FurnitureOnSell.vue'
import DetailsFurniture from '@/components/DetailsFurniture.vue'
import ModificationFurniture from '@/components/ModificationFurniture.vue'
import UserBuyingPage from '@/components/UserBuyingPage.vue'
import PaymentSucess from '@/components/PaymentSucess.vue'
import PaymentCancel from '@/components/PaymentCancel.vue'

const routes = [
  // 🏠 Page d'accueil publique
  {
    path: '/',
    name: 'Accueil',
    component: HomePage,
    children: [{ path: 'homepage/furniture/:id', component: DetailsFurniture }],
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
      { path: 'furniture/:id', component: DetailsFurniture },
      { path: 'furniture/add/sell', component: AddFurniture },
      { path: 'furniture/on/sell', component: FurnitureOnSell },
      { path: 'already-sell-furniture', component: AddFurniture },
      { path: 'profile', component: UserProfile },
      { path: 'furniture/on/sell/modify/:id', component: ModificationFurniture },
      { path: 'furniture/:id/modify', component: ModificationFurniture },
      { path: 'basket', component: UserBuyingPage },
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

  {
    path: '/payment-success',
    name: 'PaymentSuccess',
    component: PaymentSucess,
  },
  {
    path: '/payment-cancel',
    name: 'PaymentCancel',
    component: PaymentCancel,
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
