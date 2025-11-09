<script setup lang="ts">
import logo from '@/assets/logo.png'
import { useRouter } from 'vue-router'

const router = useRouter()

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
    <div class="flex flex-row gap-4 ml-auto items-center pr-5">
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
