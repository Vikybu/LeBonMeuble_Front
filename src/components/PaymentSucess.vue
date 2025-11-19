<script setup lang="ts">
import { useCartStore } from '@/stores/useCartStore'
import { onMounted } from 'vue'

const cart = useCartStore()

onMounted(() => {
  // vider le panier à la fin du paiement
  cart.clear()
})
</script>

<template>
  <div class="text-center mt-20">
    <h1 class="text-3xl font-bold text-green-700">Paiement réussi 🎉</h1>
    <p class="mt-3 text-lg">Merci pour votre achat !</p>

    <router-link class="mt-10 inline-block bg-blue-600 text-white px-4 py-2 rounded" to="/">
      Retour à l'accueil
    </router-link>
  </div>
</template>
