<script setup lang="ts">
import FooterCompo from './FooterCompo.vue'
import HeaderCompo from './HeaderCompo.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const passwordVerification = ref('')
const showPopup = ref(false)
const popupMessage = ref('')
const errorMessage = ref('')
const router = useRouter()

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

  const response = await fetch(`${URL}/user/create`, {
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

function goToHomepage() {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#FFF5E1] font-[Anta]">
    <HeaderCompo />

    <div class="flex-1 flex flex-col items-center justify-center px-4 py-6">
      <p v-if="errorMessage" class="text-center text-[#635950] mb-4">
        {{ errorMessage }}
      </p>

      <form
        class="w-full max-w-lg bg-[#635950] shadow-lg rounded-2xl p-6 flex flex-col gap-6"
        @submit.prevent="createUser"
      >
        <h1 class="text-center text-2xl text-[#FFF5E1]">Créer son profil Le Bon Meuble</h1>

        <p class="text-center text-[1rem] text-[#FFF5E1]">
          Les éléments avec un * sont obligatoires
        </p>

        <div class="flex flex-col text-center">
          <label class="text-[#FFF5E1]" for="firstname">Prénom *</label>
          <input
            v-model="user.firstname"
            id="firstname"
            type="text"
            class="border border-[#FFF5E1] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFF5E1] text-[#FFF5E1]"
          />
        </div>

        <div class="flex flex-col text-center">
          <label class="text-[#FFF5E1]" for="lastname">Nom *</label>
          <input
            v-model="user.lastname"
            id="lastname"
            type="text"
            class="border border-[#FFF5E1] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFF5E1] text-[#FFF5E1]"
          />
        </div>

        <div class="flex flex-col text-center">
          <label class="text-[#FFF5E1]" for="email">Email *</label>
          <input
            v-model="user.email"
            id="email"
            type="email"
            class="border border-[#FFF5E1] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFF5E1] text-[#FFF5E1]"
          />
        </div>

        <div class="flex flex-col text-center">
          <label class="text-[#FFF5E1]" for="password">Mot de passe *</label>
          <input
            v-model="user.password"
            id="password"
            type="password"
            class="border border-[#FFF5E1] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFF5E1] text-[#FFF5E1]"
          />
        </div>

        <div class="flex flex-col text-center">
          <label class="text-[#FFF5E1]" for="passwordVerification">
            Vérification du mot de passe *
          </label>
          <input
            v-model="passwordVerification"
            id="passwordVerification"
            type="password"
            class="border border-[#FFF5E1] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFF5E1] text-[#FFF5E1]"
          />
        </div>

        <div class="flex flex-row gap-10 justify-center mt-2">
          <button
            type="submit"
            class="cursor-pointer border border-[#FFF5E1] rounded px-4 py-2 bg-[#FFF5E1] text-[#A45338]"
          >
            Créer son profil
          </button>

          <button
            type="button"
            @click="goToHomepage"
            class="cursor-pointer border border-[#FFF5E1] rounded px-4 py-2 bg-[#FFF5E1] text-[#A45338]"
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

    <FooterCompo />
  </div>
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
