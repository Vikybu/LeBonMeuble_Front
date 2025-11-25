<script setup lang="ts">
import { ref, onMounted } from 'vue'
import HeaderCompo from './HeaderCompo.vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter, useRoute } from 'vue-router'
import MenuUser from './MenuUser.vue'

const router = useRouter()

// === Interfaces ===
interface Color {
  id: number
  name: string
}

interface Type {
  id: number
  name: string
}

interface Material {
  id: number
  name: string
}

interface FurnitureForm {
  name: string
  description: string
  status: string
  price: string
  width: string
  height: string
  length: string
  image: File | null
}

// === Constantes ===
const URL = 'http://localhost:8080'

// === Références réactives ===
const colors = ref<Color[]>([])
const types = ref<Type[]>([])
const materials = ref<Material[]>([])
const furnitureImageUrl = ref<string | null>(null)

const selectedColor = ref<number | null>(null)
const selectedType = ref<number | null>(null)
const selectedMaterial = ref<number | null>(null)

const furniture = ref<FurnitureForm>({
  name: '',
  description: '',
  status: 'on_hold',
  price: '',
  width: '',
  height: '',
  length: '',
  image: null,
})

// === Gestion des messages ===
const showPopup = ref(false)
const popupMessage = ref('')
const errorMessage = ref('')

// === Fonctions de chargement des listes ===
async function getColorFurniture(): Promise<void> {
  try {
    const response = await fetch(`${URL}/color`)
    if (!response.ok) throw new Error('Erreur lors du chargement des couleurs')
    const data = await response.json()
    colors.value = data.sort((a: Color, b: Color) => a.name.localeCompare(b.name, 'fr'))
  } catch (error) {
    console.error(error)
  }
}

async function getTypeFurniture(): Promise<void> {
  try {
    const response = await fetch(`${URL}/type`)
    if (!response.ok) throw new Error('Erreur lors du chargement des types')
    const data = await response.json()
    types.value = data.sort((a: Type, b: Type) => a.name.localeCompare(b.name, 'fr'))
    console.log('📦 Types reçus :', types)
  } catch (error) {
    console.error(error)
  }
}

async function getMaterialFurniture(): Promise<void> {
  try {
    const response = await fetch(`${URL}/material`)
    if (!response.ok) throw new Error('Erreur lors du chargement des matériaux')
    const data = await response.json()
    materials.value = data.sort((a: Material, b: Material) => a.name.localeCompare(b.name, 'fr'))
  } catch (error) {
    console.error(error)
  }
}

// === Validation du formulaire ===
function validateForm() {
  const hasExistingImage = !!furnitureImageUrl.value
  if (
    furniture.value.name === '' ||
    furniture.value.description === '' ||
    furniture.value.price === '' ||
    (!furniture.value.image && !hasExistingImage)
  ) {
    errorMessage.value = '/!\\ Tous les champs obligatoires ne sont pas remplis'
    return false
  }
  return true
}

function goToFurnitureOnSell() {
  router.push('/user/furniture/on/sell')
}

// === Fonction d’envoi ===
async function modifyFurniture(): Promise<void> {
  errorMessage.value = ''
  if (!validateForm()) return

  const authStore = useAuthStore()
  const userId = authStore.userInfo?.id

  if (!userId) {
    showPopUp('Aucun utilisateur connecté : impossible d’ajouter le meuble')
    console.error('Aucun utilisateur trouvé dans le store')
    return
  }

  if (!selectedType.value || !selectedMaterial.value || !selectedColor.value) {
    showPopUp(' Merci de sélectionner un type, un matériau et une couleur')
    return
  }

  const formData = new FormData()
  formData.append('name', furniture.value.name.trim())
  formData.append('description', furniture.value.description.trim())
  formData.append('price', furniture.value.price.trim())
  formData.append('status', 'on_hold')
  formData.append('width', furniture.value.width.trim())
  formData.append('height', furniture.value.height.trim())
  formData.append('length', furniture.value.length.trim())
  formData.append('user_id', userId.toString())
  formData.append('type_id', selectedType.value.toString())
  formData.append('material_id', selectedMaterial.value.toString())
  formData.append('color_id', selectedColor.value.toString())
  formData.append('image', furniture.value.image!)

  console.log('📦 FormData envoyée :', Object.fromEntries(formData.entries()))

  try {
    const response = await fetch(`${URL}/user/furnitures/modify/${id}`, {
      method: 'PUT',
      body: formData,
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })

    const message = await response.text()

    if (response.ok) {
      showPopUp('✅ Meuble modifié avec succès !')
      resetForm()
    } else {
      showPopUp('❌ Erreur lors de l’envoi : ' + message)
      console.error('Erreur backend :', message)
    }
  } catch (error) {
    console.error(error)
    showPopUp('❌ Erreur de communication avec le serveur.')
  }
  setTimeout(() => {
    goToFurnitureOnSell()
  }, 2000)
}

// === Helpers ===
function resetForm(): void {
  furniture.value = {
    name: '',
    description: '',
    status: 'en_attente',
    price: '',
    width: '',
    height: '',
    length: '',
    image: null,
  }
  selectedColor.value = null
  selectedType.value = null
  selectedMaterial.value = null
}

function showPopUp(message: string): void {
  popupMessage.value = message
  showPopup.value = true
  setTimeout(() => (showPopup.value = false), 3000)
}

const route = useRoute()
const id = route.params.id

async function getInfosFurniture() {
  const authStore = useAuthStore()
  console.log('Token envoyé :', authStore.token)
  const response = await fetch(`${URL}/user/furnitures/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authStore.token}`,
    },
  })
  const data = await response.json()
  Object.assign(furniture.value, data)

  furniture.value.image = null
  furnitureImageUrl.value = `${URL}${data.image.image_url}`
}

// === Initialisation ===
onMounted(() => {
  getInfosFurniture()
  getColorFurniture()
  getTypeFurniture()
  getMaterialFurniture()
})
</script>

<template>
  <HeaderCompo />
  <MenuUser />
  <p class="text-center font-[Anta] text-[#A45338] bg-[#FFF5E1] p-[1%]">{{ errorMessage }}</p>

  <div class="min-h-screen bg-[#FFF5E1] flex justify-center items-start py-5 font-[Anta]">
    <form
      class="w-full max-w-2xl bg-[#A45338] shadow-lg rounded-2xl p-6 flex flex-col gap-6"
      @submit.prevent="modifyFurniture"
    >
      <h1 class="text-center text-2xl font-[Anta] text-[#FFF5E1]">
        Modifier les informations d'un meuble
      </h1>
      <!-- Nom -->
      <div class="flex flex-col text-center">
        <label class="text-[#FFF5E1] font-[Anta]" for="name">Nom du meuble</label>
        <input
          v-model="furniture.name"
          id="name"
          type="text"
          class="border border-[#FFF5E1] rounded px-3 py-2 text-[#FFF5E1] bg-transparent focus:ring-2 focus:ring-[#FFF5E1]"
        />
      </div>

      <!-- Description -->
      <div class="flex flex-col text-center">
        <label class="text-[#FFF5E1] font-[Anta]" for="description">Description</label>
        <textarea
          rows="10"
          cols="80"
          v-model="furniture.description"
          id="description"
          class="border border-[#FFF5E1] rounded px-3 py-2 text-[#FFF5E1] bg-transparent focus:ring-2 focus:ring-[#FFF5E1]"
        ></textarea>
      </div>

      <!-- Prix -->
      <div class="flex flex-col text-center items-center">
        <label class="text-[#FFF5E1] font-[Anta]" for="price">Prix</label>
        <input
          v-model="furniture.price"
          id="price"
          type="number"
          step="0.01"
          class="w-40 border border-[#FFF5E1] rounded px-3 py-2 text-[#FFF5E1] bg-transparent focus:ring-2 focus:ring-[#FFF5E1]"
        />
      </div>

      <!-- Dimensions -->
      <div class="grid grid-cols-3 gap-4 text-center">
        <div>
          <label class="text-[#FFF5E1] font-[Anta]" for="width">Largeur</label>
          <input
            v-model="furniture.width"
            id="width"
            type="text"
            class="w-40 border border-[#FFF5E1] rounded px-3 py-2 text-[#FFF5E1] bg-transparent"
          />
        </div>
        <div>
          <label class="text-[#FFF5E1] font-[Anta]" for="height">Hauteur</label>
          <input
            v-model="furniture.height"
            id="height"
            type="text"
            class="w-40 border border-[#FFF5E1] rounded px-3 py-2 text-[#FFF5E1] bg-transparent"
          />
        </div>
        <div>
          <label class="text-[#FFF5E1] font-[Anta]" for="length">Longueur</label>
          <input
            v-model="furniture.length"
            id="length"
            type="text"
            class="w-40 border border-[#FFF5E1] rounded px-3 py-2 text-[#FFF5E1] bg-transparent"
          />
        </div>
      </div>

      <!-- Sélecteurs -->
      <div class="flex flex-col gap-4 text-center">
        <div>
          <label class="text-[#FFF5E1] font-[Anta]">Type de meuble</label>
          <select
            v-model="selectedType"
            class="border border-[#A45338] rounded-lg px-3 py-2 w-full bg-[#FFF5E1] text-[#3B2F2F] font-[Anta] focus:ring-2 focus:ring-[#A45338]"
          >
            <option value="" disabled>-- Sélectionner --</option>
            <option v-for="type in types" :key="type.id" :value="type.id">{{ type.name }}</option>
          </select>
        </div>

        <div>
          <label class="text-[#FFF5E1] font-[Anta]">Matériau</label>
          <select
            v-model="selectedMaterial"
            class="border border-[#A45338] rounded-lg px-3 py-2 w-full bg-[#FFF5E1] text-[#3B2F2F] font-[Anta] focus:ring-2 focus:ring-[#A45338]"
          >
            <option value="" disabled>-- Sélectionner --</option>
            <option v-for="mat in materials" :key="mat.id" :value="mat.id">{{ mat.name }}</option>
          </select>
        </div>

        <div>
          <label class="text-[#FFF5E1] font-[Anta]">Couleur</label>
          <select
            v-model="selectedColor"
            class="border border-[#A45338] rounded-lg px-3 py-2 w-full bg-[#FFF5E1] text-[#3B2F2F] font-[Anta] focus:ring-2 focus:ring-[#A45338]"
          >
            <option value="" disabled>-- Sélectionner --</option>
            <option v-for="color in colors" :key="color.id" :value="color.id">
              {{ color.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- Upload image -->
      <div v-if="furnitureImageUrl" class="mb-4">
        <p class="text-[#FFF5E1] mb-2">Image actuelle :</p>
        <img
          :src="furnitureImageUrl"
          alt="Image actuelle"
          class="w-40 h-40 object-cover rounded mx-auto"
        />
      </div>
      <div class="flex flex-col">
        <label class="text-[#FFF5E1] font-[Anta]" for="image">Changer la photo du meuble</label>
        <input
          class="text-[#FFF5E1] font-[Anta] text-[0.8rem]"
          id="image"
          type="file"
          accept="image/*"
          @change="
            (e: Event) => {
              const target = e.target as HTMLInputElement
              if (target.files && target.files[0]) {
                furniture.image = target.files[0]
              }
            }
          "
        />
      </div>

      <!-- Boutons -->
      <div class="flex flex-row gap-10 items-center justify-center text-center">
        <button
          type="submit"
          class="cursor-pointer border border-[#FFF5E1] rounded px-3 py-2 bg-[#FFF5E1] text-[#A45338] font-[Anta]"
        >
          Modifier
        </button>

        <button
          @click="goToFurnitureOnSell"
          type="button"
          class="cursor-pointer border border-[#FFF5E1] rounded px-3 py-2 bg-[#FFF5E1] text-[#A45338] font-[Anta]"
        >
          Retour à l'accueil
        </button>
      </div>
    </form>

    <!-- Popup -->
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
