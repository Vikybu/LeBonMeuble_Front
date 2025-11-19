<script setup lang="ts">
import logo from '@/assets/logo.png'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'
import BtnBasket from './BtnBasket.vue'

const auth = useAuthStore()
const router = useRouter()

function logout() {
  if (confirm('Êtes-vous sûr(e) de vouloir vous déconnecter ?')) {
    auth.logout()
    router.push('/')
  }
}

const isLoggedIn = computed(() => auth.isLoggedIn)
const firstname = computed(() => auth.firstname)

function goToCreateUser() {
  router.push('/creationUser')
}

function goToConnexion() {
  router.push('/connexion')
}
</script>

<template>
  <div class="w-full flex items-center justify-between bg-[#A45338]">
    <div class="h-20 md:h-auto">
      <img class="w-40 h-auto" :src="logo" alt="Logo" />
      <p class="font-[Anta] text-[#FFF5E1] text-[0.7rem]">Anciens meubles pour une nouvelle vie</p>
    </div>

    <div v-if="isLoggedIn" class="flex items-center px-4 gap-6">
      <h1 class="font-[Anta] text-[2rem] text-[#FFF5E1] truncate">Bonjour {{ firstname }}</h1>
      <BtnBasket class="border border-[#FFF5E1] bg-[#FFF5E1] rounded px-3 py-2 mr-3 ml-3" />
      <button
        @click="logout"
        class="ml-auto cursor-pointer border border-[#635950] rounded px-3 py-2 bg-[#635950] text-[#FFF5E1] font-[Anta]"
      >
        Se déconnecter
      </button>
    </div>

    <div v-else class="flex flex-row gap-4 ml-auto items-center pr-5">
      <button
        class="cursor-pointer border border-[#FFF5E1] px-4 py-2 rounded font-[Anta] text-[#FFF5E1] text-[0.7rem] whitespace-nowrap"
        type="button"
        @click="goToCreateUser"
      >
        Se créer un compte
      </button>
      <button
        class="cursor-pointer border border-[#FFF5E1] px-4 py-2 rounded font-[Anta] text-[#FFF5E1] text-[0.7rem] whitespace-nowrap"
        type="button"
        @click="goToConnexion"
      >
        Se connecter
      </button>
    </div>
  </div>
</template>
