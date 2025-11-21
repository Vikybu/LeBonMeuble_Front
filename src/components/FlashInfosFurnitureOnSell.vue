<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BtnFurnitureToSell from './BtnFurnitureToSell.vue'
import FilterCompo from './FilterCompo.vue'

const URL = 'http://localhost:8080'

const furnitures = ref<Furniture[]>([])
const authStore = useAuthStore()
const id = authStore.id
const router = useRouter()

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

const colors = ref<Color[]>([])
const types = ref<Type[]>([])
const materials = ref<Material[]>([])

const selectedColor = ref<number | null>(null)
const selectedType = ref<number | null>(null)
const selectedMaterial = ref<number | null>(null)

interface Furniture {
  id: number
  name: string
  description: string
  price: string
  status: string
  width: string
  height: string
  length: string
  type: string
  color: string
  material: string
  image: {
    id: number
    image_url: string
    alt_text: string
  }
}

async function getFurniture() {
  try {
    const response = await fetch(`${URL}/user/${id}/furnitures/onSell`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })
    furnitures.value = await response.json()
    console.log('✅ Données reçues du backend :', furnitures.value)
  } catch (error) {
    console.error('❌ Erreur chargement des meubles en vente :', error)
  }
}

function getToFurnitureDetails(id: number) {
  router.push(`/user/furniture/${id}`)
}

onMounted(() => {
  getFurniture()
})
</script>

<template>
  <div class="flex flex-row bg-[#FFF5E1] gap-5 justify-center items-center">
    <p class="font-[Anta] text-[#A45338]">Filtrer par :</p>
    <FilterCompo elementAFiltrer="Matériaux" v-model="selectedMaterial" :elements="materials" />
    <FilterCompo elementAFiltrer="Couleurs" v-model="selectedColor" :elements="colors" />
    <FilterCompo elementAFiltrer="Types de meuble" v-model="selectedType" :elements="types" />
  </div>
  <div class="bg-[#FFF5E1] p-5">
    <div class="flex flex-col gap-5">
      <div
        class="border border-[#A45338] rounded-xl p-4 flex justify-between items-start gap-6 shadow-md bg-[#FFF5E1]"
        v-for="furniture in furnitures"
        :key="furniture.id"
      >
        <img
          v-if="furniture.image"
          :src="`${URL}${furniture.image.image_url}`"
          alt="Photo du meuble"
          class="w-48 h-48 object-cover rounded-lg"
        />

        <div class="flex flex-col space-y-2 flex-1 items-start">
          <p class="font-[Anta] text-[#635950] text-xl font-semibold">
            {{ furniture.name }}
          </p>
          <p class="font-[Anta] text-[#635950] line-clamp-2">
            {{ furniture.description }}
          </p>
          <p class="font-[Anta] text-[#635950] text-sm italic">
            Dimensions : {{ furniture.width }}x{{ furniture.height }}x{{ furniture.length }}
          </p>
          <h1 class="font-[Anta] text-[#635950] text-2xl font-bold">{{ furniture.price }} €</h1>
          <p
            class="cursor-pointer font-[Anta] text-[#635950] text-sm text-decoration-line: underline"
            @click="getToFurnitureDetails(furniture.id)"
          >
            Voir plus d'informations sur le produit...
          </p>
        </div>
        <div>
          <BtnFurnitureToSell :furniture="furniture" />
        </div>
      </div>
    </div>
  </div>
</template>
