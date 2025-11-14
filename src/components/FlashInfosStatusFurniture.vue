<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const URL = 'http://localhost:8080'
const emit = defineEmits(['status-updated'])

const props = defineProps<{
  furniture: {
    id: number
    name: string
    description: string
    price: string
    width: string
    height: string
    length: string
    status: string
    image: {
      id: number
      image_url: string
      alt_text: string
    }
  }
}>()

const selectedStatus = ref(props.furniture.status)

async function updateFurnitureStatus() {
  try {
    const response = await fetch(`${URL}/admin/furnitures/${props.furniture.id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${useAuthStore().token}`,
      },
      body: JSON.stringify({ status: selectedStatus.value }),
    })
    const result = await response.text()
    console.log(result)
    emit('status-updated')
  } catch (error) {
    console.error('❌ Erreur chargement des meubles en vente :', error)
  }
}
</script>

<template>
  <div class="bg-[#FFF5E1] p-4">
    <div
      class="border border-[#A45338] rounded-xl p-2 shadow-md bg-[#FFF5E1] flex flex-row items-start gap-2"
    >
      <img
        v-if="furniture.image"
        :src="`${URL}${furniture.image.image_url}`"
        alt="Photo du meuble"
        class="w-38 h-38 object-contain flex-shrink-0 rounded-lg"
      />

      <div class="flex flex-col flex-1 justify-between space-y-2">
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
        <p class="font-[Anta] text-[#635950] text-sm italic">Voir plus d'informations...</p>
      </div>

      <div class="flex flex-col gap-2 flex-shrink-0 font-[Anta]">
        <p>Status actuel du meuble :</p>

        <select v-model="selectedStatus" class="border px-2 py-1 rounded font-[Anta]">
          <option value="" disabled>-- Sélectionner --</option>
          <option value="on_hold">En attente de validation</option>
          <option value="validated">Validé</option>
          <option value="rejected">Refusé</option>
        </select>

        <button
          @click="updateFurnitureStatus"
          type="button"
          class="border px-2 py-1 rounded bg-[#A45338] text-white font-[Anta]"
        >
          Valider
        </button>
      </div>
    </div>
  </div>
</template>
