<script setup lang="ts">
import HeaderCompo from './HeaderCompo.vue'
import MenuCompo from './MenuUser.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { onMounted } from 'vue'
import FooterCompo from './FooterCompo.vue'
import { useAuthStore } from '@/stores/auth'
import FlashInfosFurnitureOnSell from './FlashInfosFurnitureOnSell.vue'
import FilterStatusFurniture from './FilterStatusFurniture.vue'
import { computed } from 'vue'

const URL = 'http://localhost:8080'

const filteredFurnitures = computed(() => {
  if (selectedStatus.value.length === 0) {
    return furnitures.value
  }
  return furnitures.value.filter((f) => selectedStatus.value.includes(f.status))
})

const router = useRouter()
const furnitures = ref<Furniture[]>([])
const authStore = useAuthStore()
const id = authStore.id

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
  user_id: number
  image: {
    id: number
    image_url: string
    alt_text: string
  }
}

function goToAddFurniture() {
  router.push('/user/furniture/add/sell')
}

const selectedStatus = ref<string[]>([])

async function getFurniture() {
  try {
    const response = await fetch(`${URL}/user/${id}/furnitures/onSell`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })
    if (response.status === 403) {
      alert('❌ Vous ne pouvez pas modifier ce meuble.')
      return
    }
    furnitures.value = await response.json()
    console.log('✅ Données reçues du backend :', furnitures.value)
  } catch (error) {
    console.error('❌ Erreur chargement des meubles en vente :', error)
  }
}

onMounted(() => {
  getFurniture()
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#FFF5E1]">
    <HeaderCompo />
    <div class="flex-1">
      <MenuCompo />

      <button
        class="m-2 block mx-auto cursor-pointer border border-[#635950] rounded px-4 py-2 bg-[#A45338] text-[#FFF5E1] font-[Anta] hover:bg-[#8a3e27] transition"
        type="button"
        @click="goToAddFurniture"
      >
        Vendre un meuble
      </button>
      <FilterStatusFurniture v-model="selectedStatus" />
      <FlashInfosFurnitureOnSell :furnitures="filteredFurnitures" />
    </div>
  </div>
  <FooterCompo />
</template>
