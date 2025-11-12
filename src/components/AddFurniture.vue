<script setup lang="ts">
import { ref } from 'vue'
import HeaderCompo from './HeaderCompo.vue'

const showPopup = ref(false)
const popupMessage = ref('')
const errorMessage = ref('')

const furniture = ref({
  name: '',
  description: '',
  status: 'en_attente',
  price: '',
  width: '',
  height: '',
  length: '',
  type: '',
  material: '',
  color: '',
  image: '',
})

async function addFurniture() {
  errorMessage.value = ''
  if (!ValidateForm()) return

  const response = await fetch(`${URL}/creationUser`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(furniture.value),
  })
  const message = await response.text()
  console.log(message)
  if (response.ok) {
    showPopUp('Meuble créé avec succès !')
  } else {
    if (message.includes('Email already in use')) {
      showPopUp('Cet email est déjà utilisé. Vous ne pouvez pas créer ce compte.')
    } else {
      showPopUp("Un problème est survenu, merci d'essayer plus tard")
    }

    furniture.value = {
      name: '',
      description: '',
      status: 'en_attente',
      price: '',
      width: '',
      height: '',
      length: '',
      type: '',
      material: '',
      color: '',
      image: '',
    }
  }
}

function ValidateForm() {
  if (
    furniture.value.name == '' ||
    furniture.value.description == '' ||
    furniture.value.price == ''
  ) {
    errorMessage.value = '/!\\ Tous les champs ne sont pas remplis'
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
  <h1>Mettre un meuble en vente</h1>
  <div class="min-h-screen bg-[#635950]">
    <p class="text-center font-[Anta] text-[#FFF5E1] bg-[#635950] p-[1%]">{{ errorMessage }}</p>
    <div>
      <form class="flex flex-col justify-center items-center gap-6" @submit.prevent="addFurniture">
        <div class="flex flex-col text-center">
          <label class="text-[#FFF5E1] font-[Anta]" for="name">Nom du meuble *</label>
          <input
            v-model="furniture.name"
            class="border border-[#FFF5E1] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFF5E1] focus:border-transparent text-[#FFF5E1]"
            id="name"
            type="text"
          />
        </div>
        <div class="flex flex-col text-center">
          <label class="text-[#FFF5E1] font-[Anta]" for="description">Description *</label>
          <input
            v-model="furniture.description"
            class="border border-[#FFF5E1] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFF5E1] focus:border-transparent text-[#FFF5E1]"
            id="description"
            type="textarea"
          />
        </div>
        <div class="flex flex-col text-center">
          <label class="text-[#FFF5E1] font-[Anta]" for="price">Prix *</label>
          <input
            v-model="furniture.price"
            class="border border-[#FFF5E1] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFF5E1] focus:border-transparent text-[#FFF5E1]"
            id="price"
            type="text"
          />
        </div>
        <div class="flex flex-col text-center">
          <label class="text-[#FFF5E1] font-[Anta]" for="width">Largeur</label>
          <input
            v-model="furniture.width"
            class="border border-[#FFF5E1] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFF5E1] focus:border-transparent text-[#FFF5E1]"
            id="width"
            type="text"
          />
        </div>
        <div class="flex flex-col text-center">
          <label class="text-[#FFF5E1] font-[Anta]" for="height">Hauteur</label>
          <input
            v-model="furniture.height"
            class="border border-[#FFF5E1] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFF5E1] focus:border-transparent text-[#FFF5E1]"
            id="height"
            type="text"
          />
        </div>
        <div class="flex flex-col text-center">
          <label class="text-[#FFF5E1] font-[Anta]" for="length">Longueur</label>
          <input
            v-model="furniture.length"
            class="border border-[#FFF5E1] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFF5E1] focus:border-transparent text-[#FFF5E1]"
            id="length"
            type="text"
          />
        </div>
        <div class="flex flex-row gap-10">
          <button
            type="submit"
            class="border border-[#FFF5E1] rounded px-3 py-2 bg-[#FFF5E1] text-[#A45338] font-[Anta]"
          >
            Soummettre le meuble à la vérification
          </button>
          <button
            class="border border-[#FFF5E1] rounded px-3 py-2 bg-[#FFF5E1] text-[#A45338] font-[Anta]"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
