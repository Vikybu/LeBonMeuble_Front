import { defineStore } from 'pinia'

interface JwtPayload {
  id: number
  firstname: string
  email: string
  role: string
  exp?: number
}

/**
 * Décode un JWT de manière sécurisée.
 * Retourne `null` si le token est invalide.
 */
function parseJwt(token?: string | null): JwtPayload | null {
  if (!token) return null
  try {
    const base64Url = token.split('.')[1]
    if (!base64Url) return null

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    )

    return JSON.parse(jsonPayload) as JwtPayload
  } catch {
    return null
  }
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('authToken') as string | null,
    decoded: null as JwtPayload | null, // ✅ On garde le payload en mémoire
  }),

  getters: {
    isLoggedIn: (state): boolean => !!state.token,
    userInfo: (state): JwtPayload | null => state.decoded,
    firstname: (state): string | null => state.decoded?.firstname ?? null,
    role: (state): string | null => state.decoded?.role ?? null,
    id: (state): number | null => state.decoded?.id ?? null,
  },

  actions: {
    /**
     * Connecte l'utilisateur en stockant et décodant le token.
     */
    login(token: string) {
      this.token = token
      localStorage.setItem('authToken', token)
      this.decoded = parseJwt(token) // ✅ Décodage immédiat
    },

    /**
     * Déconnecte l'utilisateur (efface le token et les infos).
     */
    logout() {
      this.token = null
      this.decoded = null
      localStorage.removeItem('authToken')
    },

    /**
     * Recharge le token depuis le localStorage et le décode.
     * Appelé au démarrage de l’application (dans main.ts)
     */
    initialize() {
      const savedToken = localStorage.getItem('authToken')
      if (savedToken) {
        this.token = savedToken
        this.decoded = parseJwt(savedToken)
      } else {
        this.token = null
        this.decoded = null
      }
    },
  },
})
