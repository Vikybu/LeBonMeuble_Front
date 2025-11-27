<script setup lang="ts">
import FlashInfosStatusFurniture from './FlashInfosStatusFurniture.vue'
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import MenuAdmin from './MenuAdmin.vue'
import FooterCompo from './FooterCompo.vue'
import HeaderCompoAdmin from './HeaderCompoAdmin.vue'

const URL = 'http://localhost:8080'
const furnitures = ref<Furniture[]>([])

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

async function getFurniture(): Promise<void> {
  try {
    const authStore = useAuthStore()
    const response = await fetch(`${URL}/admin/furnitures`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authStore.token}`,
        Accept: 'application/json',
      },
    })
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
    <HeaderCompoAdmin />
    <div class="flex-none">
      <MenuAdmin />
    </div>
    <main class="flex-1 overflow-y-auto p-4 space-y-4">
      <FlashInfosStatusFurniture
        v-for="furniture in furnitures"
        :key="furniture.id"
        :furniture="furniture"
        @status-updated="getFurniture"
      />
    </main>
    <FooterCompo />
  </div>
</template>
