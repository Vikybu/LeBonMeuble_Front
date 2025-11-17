<script setup lang="ts">
import { useCartStore } from '@/stores/useCartStore'
const cart = useCartStore()
</script>

<template>
  {{ cart.items }}
  <p>Panier</p>
  <p>Contenu du panier :</p>
</template>
