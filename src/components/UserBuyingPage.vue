<script setup lang="ts">
import BaskteCompo from './BaskteCompo.vue'
import FooterCompo from './FooterCompo.vue'
import HeaderCompo from './HeaderCompo.vue'
import LastOrders from './LastOrders.vue'
import MenuUser from './MenuUser.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#FFF5E1]">
    <HeaderCompo />
    <MenuUser />
    <div class="flex flex-row w-full gap-6 px-6 py-4 flex-1">
      <BaskteCompo class="flex-1" />
      <LastOrders class="flex-1" />
    </div>
    <FooterCompo />
  </div>
</template>
