<script setup lang="ts">
import { useCartStore } from '@/stores/useCartStore'
const URL = 'http://localhost:8080'
const cart = useCartStore()
</script>

<template>
  <div class="bg-[#FFF5E1]">
    <h1 class="font-[Anta] text-[2rem] text-[#635950] mb-4">Contenu du panier :</h1>
    <div v-if="cart.items.length === 0">
      <p class="font-[Anta] text-[1.5rem] text-[#635950]">Votre panier est vide</p>
    </div>
    <div v-else v-for="item in cart.items" :key="item.id">
      <div class="flex flex-row gap-4 mb-5">
        <img
          :src="`${URL}${item.image_url}`"
          alt="Photo du meuble"
          class="w-48 h-48 object-cover rounded-lg"
        />
        <div class="flex flex-col gap-2 items-center justify-center">
          <p class="font-[Anta] text-[1.3rem] text-[#635950]">Nom de l'article : {{ item.name }}</p>
          <p class="font-[Anta] text-[1.2rem] text-[#635950] italic">
            Prix de l'article : {{ item.price }} €
          </p>
        </div>
      </div>
      <hr />
      <p class="font-[Anta] text-[1.3rem] text-[#635950] mt-5 mb-5">
        Montant total du panier : {{ cart.totalPrice }}
      </p>
    </div>
  </div>
</template>
