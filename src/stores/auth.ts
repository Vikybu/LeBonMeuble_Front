import { defineStore } from 'pinia'

/**
 * Interface pour le payload attendu dans le token JWT
 */
interface JwtPayload {
  id: number
  firstname: string
  email: string
  exp?: number
}

/**
 * Fonction utilitaire pour décoder un token JWT
 * Retourne null si le token est invalide ou non défini
 */
function parseJwt(token?: string | null): JwtPayload | null {
  if (!token) return null

  try {
    const parts = token.split('.')
    // Vérifie que le token a bien au moins deux parties
    if (!parts[1]) return null

    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
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
  }),

  getters: {
    // Est-ce que l'utilisateur est connecté ?
    isLoggedIn: (state): boolean => !!state.token,

    // Informations complètes du payload du token
    userInfo: (state): JwtPayload | null => parseJwt(state.token),

    // Prénom de l'utilisateur
    firstname: (state): string | null => parseJwt(state.token)?.firstname ?? null,
  },

  actions: {
    /**
     * Connecte l'utilisateur en stockant le token
     */
    login(token: string) {
      this.token = token
      localStorage.setItem('authToken', token)
    },

    /**
     * Déconnecte l'utilisateur en supprimant le token
     */
    logout() {
      this.token = null
      localStorage.removeItem('authToken')
    },
  },
})
