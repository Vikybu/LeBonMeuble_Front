<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function getBackToHome() {
  router.push('/user/homepage')
}
</script>

<template>
  <div class="flex flex-row gap-3">
    <button
      class="cursor-pointer self-start border border-[#635950] rounded px-4 py-2 bg-[#A45338] text-[#FFF5E1] font-[Anta] hover:bg-[#8a3e27] transition"
      type="button"
      @click="getBackToHome"
    >
      REVENIR A L'ACCUEIL
    </button>
  </div>
</template>
