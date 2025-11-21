<script setup lang="ts">
import { useCartStore } from '@/stores/useCartStore'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const cart = useCartStore()
const showPopup = ref(false)
const popupMessage = ref('')
const auth = useAuthStore()
const router = useRouter()

const props = defineProps<{
  furniture: {
    id: number
    name: string
    price: number
    image: { image_url: string }
  }
}>()

function addToCart() {
  if (auth.userInfo?.id == null) {
    router.push('/connexion')
  } else {
    cart.addItem({
      id: props.furniture.id,
      name: props.furniture.name,
      price: props.furniture.price,
      image_url: props.furniture.image?.image_url,
    })
    showPopUp('Article ajouté au panier !')
  }
}

function showPopUp(message: string): void {
  popupMessage.value = message
  showPopup.value = true
  setTimeout(() => (showPopup.value = false), 3000)
}
</script>

<template>
  <div class="flex flex-row gap-3">
    <button
      class="cursor-pointer self-start border border-[#635950] rounded px-4 py-2 bg-[#A45338] text-[#FFF5E1] font-[Anta] hover:bg-[#8a3e27] transition"
      type="button"
      @click.prevent="addToCart()"
    >
      <div class="flex flex-row">
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
          class="lucide lucide-plus-icon lucide-plus"
        >
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
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
          class="lucide lucide-shopping-cart-icon lucide-shopping-cart"
        >
          <circle cx="8" cy="21" r="1" />
          <circle cx="19" cy="21" r="1" />
          <path
            d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"
          />
        </svg>
      </div>
    </button>
    <transition name="fade">
      <div
        v-if="showPopup"
        class="fixed bottom-5 right-5 bg-[#A45338] text-[#FFF5E1] px-6 py-3 rounded-xl shadow-lg font-[Anta]"
      >
        {{ popupMessage }}
      </div>
    </transition>
  </div>
</template>
