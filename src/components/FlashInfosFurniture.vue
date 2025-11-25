<script setup lang="ts">
import { useRouter } from 'vue-router'
import BtnBuyFurniture from './BtnBuyFurniture.vue'

const URL = 'http://localhost:8080'
const router = useRouter()

function getToFurnitureDetails(id: number) {
  router.push(`/user/furniture/${id}`)
}

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

const props = defineProps<{
  furnitures: Furniture[]
}>()
</script>

<template>
  <div class="bg-[#FFF5E1] p-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div
        class="border border-[#A45338] rounded-xl p-4 flex items-center gap-6 shadow-md bg-[#FFF5E1]"
        v-for="furniture in props.furnitures"
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

          <BtnBuyFurniture :furniture="furniture" />
        </div>
      </div>
    </div>
  </div>
</template>
