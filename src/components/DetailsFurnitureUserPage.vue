<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import HeaderCompo from './HeaderCompo.vue'
import BtnBackHomepage from './BtnBackHomepage.vue'
import FooterCompo from './FooterCompo.vue'

const route = useRoute()
//const router = useRouter()
const id = route.params.id
const furniture = ref<Furniture | null>(null)

interface Furniture {
  id: number
  name: string
  description: string
  price: number
  status: string
  width: number
  height: number
  length: number
  type: {
    name: string
  }
  color: {
    name: string
  }
  material: {
    name: string
  }
  image: {
    id: number
    image_url: string
    alt_text: string
  }
}

const URL = 'http://localhost:8080'

async function openDetailsFurnitureById() {
  try {
    const response = await fetch(`${URL}/user/furnitures/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${useAuthStore().token}`,
      },
    })
    furniture.value = await response.json()
    console.log('✅ Données reçues du backend :', furniture.value)
  } catch (error) {
    console.error('❌ Erreur chargement des meubles en vente :', error)
  }
}

onMounted(() => {
  openDetailsFurnitureById()
})
</script>

<template>
  <HeaderCompo />
  <div class="bg-[#FFF5E1] p-4">
    <div class="flex flex-row gap-5">
      <div v-if="furniture" class="w-full l p-4 flex gap-6 bg-[#FFF5E1]">
        <img
          :src="`${URL}${furniture.image.image_url}`"
          alt="Photo du meuble"
          class="w-80 h-auto object-cover rounded-lg"
        />

        <div class="flex flex-col justify-between space-y-2">
          <p class="font-[Anta] text-[#635950] text-xl font-semibold">
            {{ furniture.name }}
          </p>
          <p class="font-[Anta] text-[#635950]">
            {{ furniture.description }}
          </p>
          <p class="font-[Anta] text-[#635950] line-clamp-2">
            Type de meuble : {{ furniture.type.name }}
          </p>
          <p class="font-[Anta] text-[#635950] line-clamp-2">
            Matériau : {{ furniture.material.name }}
          </p>
          <p class="font-[Anta] text-[#635950] line-clamp-2">
            Couleur : {{ furniture.color.name }}
          </p>
          <p class="font-[Anta] text-[#635950] text-sm italic">
            Dimensions : {{ furniture.width }}x{{ furniture.height }}x{{ furniture.length }}
          </p>
          <h1 class="font-[Anta] text-[#635950] text-2xl font-bold">{{ furniture.price }} €</h1>

          <BtnBackHomepage />
        </div>
      </div>
    </div>
    <FooterCompo />
  </div>
</template>
