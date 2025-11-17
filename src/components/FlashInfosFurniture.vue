<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/useCartStore'

const URL = 'http://localhost:8080'
const router = useRouter()
const cart = useCartStore()

const furnitures = ref<Furniture[]>([])

interface Furniture {
  id: number
  name: string
  description: string
  price: number
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
    const response = await fetch(`${URL}/user/furnitures`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${useAuthStore().token}`,
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

function addToCart(furniture: Furniture) {
  cart.addItem({
    id: furniture.id,
    name: furniture.name,
    price: Number(furniture.price),
    image_url: furniture.image?.image_url,
  })
}

onMounted(() => {
  getFurniture()
})
</script>

<template>
  <div class="bg-[#FFF5E1] p-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div
        class="border border-[#A45338] rounded-xl p-4 flex items-center gap-6 shadow-md bg-[#FFF5E1]"
        v-for="furniture in furnitures"
        :key="furniture.id"
      >
        <img
          v-if="furniture.image"
          :src="`${URL}${furniture.image.image_url}`"
          alt="Photo du meuble"
          class="w-48 h-48 object-cover rounded-lg"
        />

        <div class="flex flex-col justify-between space-y-2">
          <p class="font-[Anta] text-[#635950] text-xl font-semibold">
            {{ furniture.name }}
          </p>
          <p class="font-[Anta] text-[#635950] line-clamp-2">
            {{ furniture.description }}
          </p>
          <p class="font-[Anta] text-[#635950] text-sm italic">
            Dimensions : {{ furniture.width }}x{{ furniture.height }}x{{ furniture.length }}
          </p>
          <h1 class="cursor-pointer font-[Anta] text-[#635950] text-2xl font-bold">
            {{ furniture.price }} €
          </h1>
          <p
            class="cursor-pointer font-[Anta] text-[#635950] text-sm text-decoration-line: underline"
            @click="getToFurnitureDetails(furniture.id)"
          >
            Voir plus d'informations sur le produit...
          </p>

          <button
            class="cursor-pointer self-start border border-[#635950] rounded px-4 py-2 bg-[#A45338] text-[#FFF5E1] font-[Anta] hover:bg-[#8a3e27] transition"
            type="button"
            @click.prevent="addToCart(furniture)"
          >
            ACHETER
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
