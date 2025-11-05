<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { onMounted } from 'vue'

const router = useRouter()
const route = useRoute()

onMounted(() => {
  if (route.path === '/' || route.path === '') {
    router.push('/')
  }
})
</script>

<template>
  <router-view />
</template>

<style scoped></style>
