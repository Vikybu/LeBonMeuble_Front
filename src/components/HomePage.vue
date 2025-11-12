<script setup lang="ts">
import HeaderCompo from './HeaderCompo.vue'
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'
import MenuCompo from './MenuCompo.vue'
import FlashInfosFurniture from './FlashInfosFurniture.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function goToAddFurniture() {
  router.push('/addFurniture')
}

const auth = useAuthStore()

// Computed pour que ça reste réactif
const isLoggedIn = computed(() => auth.isLoggedIn)
</script>

<template>
  <div v-if="isLoggedIn">
    <HeaderCompo />
    <MenuCompo />
    <button type="button" @click="goToAddFurniture">Vendre un meuble</button>
    <FlashInfosFurniture />
  </div>

  <div v-else>
    <HeaderCompo />
    <FlashInfosFurniture />
  </div>
</template>
