<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

function logout() {
  if (confirm('Êtes-vous sûr(e) de vouloir vous déconnecter ?')) {
    authStore.logout()
    router.push('/connexion')
  }
}
</script>

<template>
  <button
    @click="logout"
    class="ml-auto cursor-pointer border border-[#635950] rounded px-3 py-2 bg-[#635950] text-[#FFF5E1] font-[Anta]"
  >
    Se déconnecter
  </button>
</template>
