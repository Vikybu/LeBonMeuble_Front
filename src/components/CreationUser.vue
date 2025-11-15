<script setup lang="ts">
import FooterCompo from './FooterCompo.vue'
import HeaderCompo from './HeaderCompo.vue'
import { ref } from 'vue'

const passwordVerification = ref('')
const showPopup = ref(false)
const popupMessage = ref('')
const errorMessage = ref('')

const user = ref({
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  role: 'USER',
})

const URL = 'http://localhost:8080'

async function createUser() {
  errorMessage.value = ''
  if (!ValidateForm()) return
  if (!VerificationPassword()) return

  const response = await fetch(`${URL}/creationUser`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user.value),
  })
  const message = await response.text()
  console.log(message)
  if (response.ok) {
    showPopUp('Compte créé avec succès ! Vous allez pouvoir vous connecter')
  } else {
    if (message.includes('Email already in use')) {
      showPopUp('Cet email est déjà utilisé. Vous ne pouvez pas créer ce compte.')
    } else {
      showPopUp("Un problème est survenu, merci d'essayer plus tard")
    }
  }
}

function ValidateForm() {
  if (
    user.value.firstname == '' ||
    user.value.lastname == '' ||
    user.value.email == '' ||
    user.value.password == ''
  ) {
    errorMessage.value = '/!\\ Tous les champs ne sont pas remplis'
    return false
  }
  return true
}

function VerificationPassword() {
  if (user.value.password !== passwordVerification.value) {
    errorMessage.value = '/!\\ Les mots de passe ne correspondent pas.'
    return false
  }
  return true
}

function showPopUp(message: string) {
  popupMessage.value = message
  showPopup.value = true
  setTimeout(() => {
    showPopup.value = false
  }, 3000)
}
</script>

<template>
  <HeaderCompo />
  <div class="min-h-screen bg-[#635950]">
    <p class="text-center font-[Anta] text-[#FFF5E1] bg-[#635950] p-[1%]">{{ errorMessage }}</p>
    <div>
      <form class="flex flex-col justify-center items-center gap-6" @submit.prevent="createUser">
        <div class="flex flex-col text-center">
          <label class="text-[#FFF5E1] font-[Anta]" for="firstname">Prénom *</label>
          <input
            v-model="user.firstname"
            class="border border-[#FFF5E1] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFF5E1] focus:border-transparent text-[#FFF5E1]"
            id="firstname"
            type="text"
          />
        </div>
        <div class="flex flex-col text-center">
          <label class="text-[#FFF5E1] font-[Anta]" for="lastname">Nom *</label>
          <input
            v-model="user.lastname"
            class="border border-[#FFF5E1] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFF5E1] focus:border-transparent text-[#FFF5E1]"
            id="lastname"
            type="text"
          />
        </div>
        <div class="flex flex-col text-center">
          <label class="text-[#FFF5E1] font-[Anta]" for="email">Email *</label>
          <input
            v-model="user.email"
            class="border border-[#FFF5E1] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFF5E1] focus:border-transparent text-[#FFF5E1]"
            id="email"
            type="email"
          />
        </div>
        <div class="flex flex-col text-center">
          <label class="text-[#FFF5E1] font-[Anta]" for="password">Mot de passe *</label>
          <input
            v-model="user.password"
            class="border border-[#FFF5E1] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFF5E1] focus:border-transparent text-[#FFF5E1]"
            id="password"
            type="password"
          />
        </div>
        <div class="flex flex-col text-center">
          <label class="text-[#FFF5E1] font-[Anta]" for="passwordVerification"
            >Vérification du mot de passe *</label
          >
          <input
            v-model="passwordVerification"
            class="border border-[#FFF5E1] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFF5E1] focus:border-transparent text-[#FFF5E1]"
            id="passwordVerification"
            type="password"
          />
        </div>
        <div class="flex flex-row gap-10">
          <button
            type="submit"
            class="cursor-pointer border border-[#FFF5E1] rounded px-3 py-2 bg-[#FFF5E1] text-[#A45338] font-[Anta]"
          >
            Créer son profil
          </button>
          <button
            class="cursor-pointer border border-[#FFF5E1] rounded px-3 py-2 bg-[#FFF5E1] text-[#A45338] font-[Anta]"
          >
            Annuler
          </button>
        </div>
      </form>
      <transition name="fade">
        <div
          v-if="showPopup"
          class="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg"
        >
          {{ popupMessage }}
        </div>
      </transition>
    </div>
  </div>
  <FooterCompo />
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
