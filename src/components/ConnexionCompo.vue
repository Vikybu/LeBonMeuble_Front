<script setup lang="ts">
import logo from '@/assets/logo.png'
import FooterCompo from './FooterCompo.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const user = ref({
  email: '',
  password: '',
})

const URL = 'http://localhost:8080'

const router = useRouter()

function goToCreateUser() {
  router.push('/creationUser')
}

async function connexion() {
  const response = await fetch(`${URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user.value),
  })

  if (!response.ok) {
    alert('Email ou mot de passe incorrect')
    return
  }

  const data = await response.json()
  localStorage.setItem('token', data.token)

  const prenom = data.firstname

  router.push({ name: 'HomePage', params: { firstname: prenom } })
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#FFF5E1]">
    <header class="bg-[#A45338] w-full flex flex-col justify-center items-center p-2">
      <img class="w-60 h-auto" :src="logo" alt="Logo" />
      <p class="font-[Anta] text-[#FFF5E1] text-center">Anciens meubles pour une nouvelle vie</p>
    </header>

    <main class="flex-grow flex flex-col justify-center items-center">
      <p class="text-[#635950] font-[Anta] text-center p-[1.5rem]">
        Si vous possédez un compte, vous pouvez vous connecter ci-dessous :
      </p>

      <form
        @submit.prevent="connexion"
        class="w-full max-w-sm bg-[#A45338] shadow-lg rounded-2xl p-6 flex flex-col items-center justify-center gap-6"
      >
        <div class="w-full flex flex-col gap-1">
          <label class="text-[#FFF5E1] font-[Anta]" for="email">Email de connexion</label>
          <input
            v-model="user.email"
            class="border border-[#FFF5E1] rounded px-3 py-2"
            id="email"
            type="email"
          />

          <label class="text-[#FFF5E1] font-[Anta]" for="password">Mot de passe</label>
          <input
            v-model="user.password"
            class="border border-[#FFF5E1] rounded px-3 py-2"
            id="password"
            type="password"
          />
        </div>

        <div class="flex gap-10">
          <button
            class="border border-[#FFF5E1] rounded px-3 py-2 bg-[#FFF5E1] text-[#A45338] font-[Anta]"
            type="submit"
          >
            Se connecter
          </button>
          <button
            class="border border-[#FFF5E1] rounded px-3 py-2 bg-[#FFF5E1] text-[#A45338] font-[Anta]"
            type="button"
          >
            Annuler
          </button>
        </div>
      </form>

      <div class="flex flex-col justify-center items-center p-[1.5rem]">
        <p class="text-[#635950] font-[Anta] text-center mb-4">
          Si vous ne possédez pas de compte, vous pouvez en créer un en cliquant ici :
        </p>
        <button
          type="button"
          @click="goToCreateUser"
          class="border border-[#635950] rounded px-3 py-2 bg-[#635950] text-[#FFF5E1] font-[Anta]"
        >
          Se créer un compte
        </button>
      </div>
    </main>

    <FooterCompo />
  </div>
</template>
