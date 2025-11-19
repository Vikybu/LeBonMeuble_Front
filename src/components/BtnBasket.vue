<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/useCartStore'

const router = useRouter()
const cart = useCartStore()

function goToBasket() {
  router.push('/user/basket')
}
</script>

<template>
  <div>
    <button
      class="cursor-pointer bg-[#635950] cursor-pointer rounded px-2 py-2"
      @click="goToBasket"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide-shopping-cart-icon lucide-shopping-cart text-[#FFF5E1]"
      >
        <circle cx="8" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path
          d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"
        />
      </svg>
    </button>
    <span class="font-[Anta] text-[#FFF5E1]">{{ cart.count }}</span>
  </div>
</template>
