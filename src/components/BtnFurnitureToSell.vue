<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'

const URL = 'http://localhost:8080'

const router = useRouter()
const authStore = useAuthStore()
const showPopup = ref(false)
const popupMessage = ref('')
const showConfirm = ref(false)

const props = defineProps({
  furniture: {
    type: Object,
    required: true,
  },
})

function askDelete() {
  showConfirm.value = true
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

function showPopUp(message: string): void {
  popupMessage.value = message
  showPopup.value = true
  setTimeout(() => (showPopup.value = false), 3000)
}

function goToModificationFurniture() {
  router.push(`/user/furniture/on/sell/modify/${props.furniture.id}`)
}

async function confirmDelete() {
  showConfirm.value = false

  try {
    const response = await fetch(`${URL}/user/furnitures/delete/${props.furniture.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })

    const message = await response.text()

    if (response.ok) {
      showPopUp('✅ Meuble supprimé !')

      setTimeout(() => {
        router.go(0)
      }, 1500)
    } else {
      showPopUp('❌ Erreur : ' + message)
    }
  } catch (err) {
    console.log(err)
    showPopUp('❌ Erreur de communication')
  }
}
function cancelDelete() {
  showConfirm.value = false
}
</script>

<template>
  <div class="flex flex-col items-center text-center gap-2 ml-auto">
    <p
      class="font-[Anta] px-3 py-1 rounded-full border text-sm"
      :class="statusClass(props.furniture.status)"
    >
      {{ translateStatus(props.furniture.status) }}
    </p>

    <!-- Bouton modifier -->
    <button
      class="cursor-pointer border border-[#FFF5E1] rounded px-3 py-2 bg-[#635950] text-[#FFF5e1] font-[Anta]"
      @click="goToModificationFurniture"
    >
      Modifier le meuble
    </button>

    <!-- Bouton supprimer → ouvre la popup -->
    <button
      @click="askDelete"
      class="cursor-pointer border border-[#FFF5E1] rounded px-3 py-2 bg-[#635950] text-[#FFF5e1] font-[Anta]"
    >
      Supprimer le meuble
    </button>

    <!-- Popup de confirmation -->
    <div v-if="showConfirm" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div class="bg-[#FFF5E1] p-6 rounded-xl shadow-lg text-center w-80 font-[Anta]">
        <p class="text-[#A45338] text-lg mb-4">Voulez-vous vraiment supprimer ce meuble ?</p>

        <div class="flex justify-center gap-4">
          <button @click="confirmDelete" class="px-4 py-2 bg-red-600 text-white rounded-lg">
            Oui
          </button>

          <button @click="cancelDelete" class="px-4 py-2 bg-gray-400 text-white rounded-lg">
            Non
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="showPopup"
    class="fixed bottom-4 left-1/2 -translate-x-1/2 bg-[#A45338] text-white px-5 py-3 rounded-lg shadow-lg font-[Anta] z-50"
  >
    {{ popupMessage }}
  </div>
</template>
