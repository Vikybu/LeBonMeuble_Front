<script setup lang="ts">
import HeaderCompo from './HeaderCompo.vue'
import MenuCompo from './MenuUser.vue'
import FlashInfosFurniture from './FlashInfosFurniture.vue'
import { useRouter } from 'vue-router'
import FooterCompo from './FooterCompo.vue'
import DeconnexionButton from './DeconnexionButton.vue'

const router = useRouter()

function goToAddFurniture() {
  router.push('furniture/sell')
}
</script>

<template>
  <div class="bg-[#FFF5E1]">
    <div class="flex items-center justify-between w-full px-6 py-3 bg-[#A45338]">
      <div class="flex items-center gap-3">
        <HeaderCompo />
      </div>

      <DeconnexionButton />
    </div>
    <MenuCompo />
    <button
      class="mr-5 self-start border border-[#635950] rounded px-4 py-2 bg-[#A45338] text-[#FFF5E1] font-[Anta] hover:bg-[#8a3e27] transition"
      type="button"
      @click="goToAddFurniture"
    >
      Vendre un meuble
    </button>
    <FlashInfosFurniture />
  </div>

  <FooterCompo />
</template>
