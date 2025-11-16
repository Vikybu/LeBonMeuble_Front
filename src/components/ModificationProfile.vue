<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const passwordVerification = ref('')
const errorMessage = ref('')
const authStore = useAuthStore()
const id = authStore.id
const showPopup = ref(false)
const popupMessage = ref('')

const form = ref({
  firstname: '',
  lastname: '',
  email: '',
  password: '',
})

function cancelForm() {
  router.push('/admin/dashboard')
}

const URL = 'http://localhost:8080'

function VerificationPassword() {
  if (form.value.password || passwordVerification.value == '') {
    return true
  } else {
    if (form.value.password !== passwordVerification.value) {
      errorMessage.value = '/!\\ Les mots de passe ne correspondent pas.'
      return false
    }
  }
}

async function getInfosUser() {
  const response = await fetch(`${URL}/user/infos/${id}`, { method: 'GET' })
  const data = await response.json()
  Object.assign(form.value, data)
}

async function modifyInfos() {
  try {
    errorMessage.value = ''
    if (!VerificationPassword()) return

    const payload = {
      firstname: form.value.firstname,
      lastname: form.value.lastname,
      email: form.value.email,
      password: form.value.password || null,
    }

    const response = await fetch(`${URL}/user/profile/modify/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json().catch(() => null)

    if (response.ok) {
      showPopUp('✅ Profil modifié avec succès !')
      getInfosUser()
    } else {
      console.error('Erreur backend :', data)
      showPopUp('❌ Erreur : ' + (data || 'Erreur inconnue'))
    }
  } catch (error) {
    console.error(error)
    showPopUp('❌ Erreur de communication avec le serveur.')
  }
}

function showPopUp(message: string): void {
  popupMessage.value = message
  showPopup.value = true
  setTimeout(() => (showPopup.value = false), 3000)
}

onMounted(async () => {
  getInfosUser()
})
</script>

<template>
  <div class="min-h-screen bg-[#FFF5E1] flex justify-center items-start py-5 font-[Anta]">
    <p class="text-center font-[Anta] text-[#635950] bg-[#FFF5E1] p-[1%]">{{ errorMessage }}</p>
    <form
      class="w-full max-w-sm bg-[#A45338] shadow-lg rounded-2xl p-6 flex flex-col gap-6"
      @submit.prevent="modifyInfos()"
    >
      <h1 class="text-center text-2xl font-[Anta] text-[#FFF5E1]">Modifier son profil</h1>

      <!-- Champs du formulaire -->
      <div class="flex flex-col gap-4">
        <div class="flex flex-col">
          <label class="text-[#FFF5E1] font-[Anta]">Prénom</label>
          <input
            v-model="form.firstname"
            type="text"
            placeholder="Prénom"
            class="border border-[#FFF5E1] font-[Anta] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFF5E1] focus:border-transparent text-[#FFF5E1]"
            id="firstname"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-[#FFF5E1] font-[Anta]">Nom</label>
          <input
            v-model="form.lastname"
            type="text"
            placeholder="Nom"
            class="border border-[#FFF5E1] font-[Anta] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFF5E1] focus:border-transparent text-[#FFF5E1]"
            id="lastname"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-[#FFF5E1] font-[Anta]">Email</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="Adresse email"
            class="border border-[#FFF5E1] font-[Anta] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFF5E1] focus:border-transparent text-[#FFF5E1]"
            id="email"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-[#FFF5E1] font-[Anta]">Mot de passe</label>
          <input
            v-model="form.password"
            type="password"
            placeholder="Mot de passe"
            class="border border-[#FFF5E1] font-[Anta] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFF5E1] focus:border-transparent text-[#FFF5E1]"
            id="password"
          />
        </div>
        <div class="flex flex-col">
          <label class="text-[#FFF5E1] font-[Anta]" for="passwordVerification"
            >Vérification du mot de passe</label
          >
          <input
            v-model="passwordVerification"
            placeholder="Vérification du mot de passe"
            class="border border-[#FFF5E1] rounded font-[Anta] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFF5E1] focus:border-transparent text-[#FFF5E1]"
            id="passwordVerification"
            type="password"
          />
        </div>
      </div>

      <!-- Boutons -->
      <div class="flex flex-col gap-3 mt-4">
        <button
          type="submit"
          class="cursor-pointer w-full bg-[#FFF5E1] hover:bg-[#FFF5E1] text-[#635950] font-[Anta] py-2 rounded-lg shadow-md transition-colors duration-200"
        >
          Modifier
        </button>

        <button
          type="button"
          @click="cancelForm"
          class="cursor-pointer w-full bg-[#FFF5E1] hover:bg-[#FFF5E1] text-[#635950] font-[Anta] py-2 rounded-lg shadow-md transition-colors duration-200"
        >
          Annuler
        </button>
      </div>
    </form>
    <transition name="fade">
      <div
        v-if="showPopup"
        class="fixed bottom-5 right-5 bg-[#FFF5E1] text-[#A45338] px-6 py-3 rounded-xl shadow-lg font-[Anta]"
      >
        {{ popupMessage }}
      </div>
    </transition>
  </div>
</template>
