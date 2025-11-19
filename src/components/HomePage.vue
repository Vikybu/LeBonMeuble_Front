<script setup lang="ts">
import HeaderCompo from './HeaderCompo.vue'
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'
import MenuCompo from './MenuUser.vue'
import FlashInfosFurniture from './FlashInfosFurniture.vue'
import { useRouter } from 'vue-router'
import FooterCompo from './FooterCompo.vue'

const router = useRouter()

function goToAddFurniture() {
  router.push('/addFurniture')
}

const auth = useAuthStore()

// Computed pour que ça reste réactif
const isLoggedIn = computed(() => auth.isLoggedIn)
</script>

<template>
  <div class="bg-[#FFF5E1]" v-if="isLoggedIn">
    <HeaderCompo />
    <MenuCompo />
    <button
      class="m-2 block mx-auto cursor-pointer border border-[#635950] rounded px-4 py-2 bg-[#A45338] text-[#FFF5E1] font-[Anta] hover:bg-[#8a3e27] transition"
      type="button"
      @click="goToAddFurniture"
    >
      Vendre un meuble
    </button>
    <FlashInfosFurniture />
  </div>

  <div v-else>
    <HeaderCompo />
    <FlashInfosFurniture />
  </div>
  <FooterCompo />
</template>
