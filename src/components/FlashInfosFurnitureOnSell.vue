<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'

const URL = 'http://localhost:8080'

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

function translateStatus(status: string) {
  const map: Record<string, string> = {
    validated: 'Validé',
    sold: 'Vendu',
    on_hold: 'En attente',
    rejected: 'Refusé',
  }
  return map[status] ?? status
}

function statusClass(status: string) {
  const map: Record<string, string> = {
    validated: 'border-green-600 text-green-700 bg-green-100',
    refused: 'border-red-600 text-red-700 bg-red-100',
    on_hold: 'border-yellow-600 text-yellow-700 bg-yellow-100',
    sold: 'border-gray-600 text-gray-700 bg-gray-100',
  }

  return map[status] ?? 'border-gray-400 text-gray-600 bg-gray-100'
}

onMounted(() => {
  getFurniture()
})
</script>

<template>
  <div class="bg-[#FFF5E1] p-10">
    <div>
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
          <p class="font-[Anta] text-[#635950]">
            {{ furniture.description }}
          </p>
          <p class="font-[Anta] text-[#635950] text-sm italic">
            Dimensions : {{ furniture.width }}x{{ furniture.height }}x{{ furniture.length }}
          </p>
          <h1 class="font-[Anta] text-[#635950] text-2xl font-bold">{{ furniture.price }} €</h1>
          <p class="font-[Anta] text-[#635950] text-sm">
            Voir plus d'informations sur le produit...
          </p>
        </div>
        <div class="flex flex-col items-center text-center gap-2 ml-auto">
          <p
            class="font-[Anta] px-3 py-1 rounded-full border text-sm"
            :class="statusClass(furniture.status)"
          >
            {{ translateStatus(furniture.status) }}
          </p>
          <button
            class="cursor-pointer border border-[#FFF5E1] rounded px-3 py-2 bg-[#635950] text-[#FFF5e1] font-[Anta]"
          >
            Modifier le meuble
          </button>
          <button
            class="cursor-pointer border border-[#FFF5E1] rounded px-3 py-2 bg-[#635950] text-[#FFF5e1] font-[Anta]"
          >
            Retirer de la vente
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
