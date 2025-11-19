<script setup lang="ts">
import BaskteCompo from './BaskteCompo.vue'
import FooterCompo from './FooterCompo.vue'
import HeaderCompo from './HeaderCompo.vue'
import LastOrders from './LastOrders.vue'
</script>

<template>
  <HeaderCompo />
  <div class="w-full flex flex-row justify-around bg-[#FFF5E1]">
    <BaskteCompo />
    <LastOrders />
  </div>

  <FooterCompo />
</template>
