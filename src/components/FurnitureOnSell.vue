<script setup lang="ts">
import HeaderCompo from './HeaderCompo.vue'
import MenuCompo from './MenuUser.vue'
import { useRouter } from 'vue-router'
import FooterCompo from './FooterCompo.vue'
import FlashInfosFurnitureOnSell from './FlashInfosFurnitureOnSell.vue'

const router = useRouter()

function goToAddFurniture() {
  router.push('/user/furniture/add/sell')
}
</script>

<template>
  <div class="bg-[#FFF5E1]">
    <HeaderCompo />
    <MenuCompo />

    <button
      class="m-2 block mx-auto cursor-pointer border border-[#635950] rounded px-4 py-2 bg-[#A45338] text-[#FFF5E1] font-[Anta] hover:bg-[#8a3e27] transition"
      type="button"
      @click="goToAddFurniture"
    >
      Vendre un meuble
    </button>

    <FlashInfosFurnitureOnSell />
  </div>

  <FooterCompo />
</template>
