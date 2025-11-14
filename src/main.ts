import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/router'
import './assets/main.css'
import { useAuthStore } from '@/stores/auth'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

const auth = useAuthStore()
auth.initialize()

app.use(router)
router.isReady().then(() => app.mount('#app'))
