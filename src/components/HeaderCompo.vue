<script setup lang="ts">
import logo from '@/assets/logo.png'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'

const auth = useAuthStore()
const router = useRouter()

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
  <div class="flex flex-row bg-[#A45338]">
    <div class="w-full h-20 md:h-auto">
      <img class="w-40 h-auto" :src="logo" alt="Logo" />
      <p class="font-[Anta] text-[#FFF5E1] text-[0.7rem]">Anciens meubles pour une nouvelle vie</p>
    </div>
    <div v-if="isLoggedIn" class="flex items-center pr-20">
      <h1 class="font-[Anta] text-[2rem] text-[#FFF5E1] text-2xl truncate">
        Bonjour {{ firstname }}
      </h1>
    </div>
    <div v-else class="flex flex-row gap-4 ml-auto items-center pr-5">
      <button
        class="border border-[#FFF5E1] px-4 py-2 rounded font-[Anta] text-[#FFF5E1] text-[0.7rem] whitespace-nowrap"
        type="button"
        @click="goToCreateUser"
      >
        Se créer un compte
      </button>
      <button
        class="border border-[#FFF5E1] px-4 py-2 rounded font-[Anta] text-[#FFF5E1] text-[0.7rem] whitespace-nowrap"
        type="button"
        @click="goToConnexion"
      >
        Se connecter
      </button>
    </div>
  </div>
</template>
