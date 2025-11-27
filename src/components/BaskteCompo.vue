<script setup lang="ts">
import { useCartStore } from '@/stores/useCartStore'
import { useAuthStore } from '@/stores/auth'

const URL = 'http://localhost:8080'
const cart = useCartStore()
const authStore = useAuthStore()

async function payTheCard() {
  const response = await fetch(`${URL}/checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authStore.token}`,
    },
    body: JSON.stringify({
      userId: authStore.userInfo?.id,
      items: cart.items.map((i) => ({
        furnitureId: i.id,
        name: i.name,
        amount: i.price * 100,
        quantity: 1,
      })),
    }),
  })

  const data = await response.json()
  window.location.href = data.sessionUrl
}
</script>

<template>
  <div class="bg-[#FFF5E1]">
    <h1 class="font-[Anta] text-[2rem] text-[#635950] mb-4">Contenu du panier :</h1>
    <div v-if="cart.items.length === 0">
      <p class="font-[Anta] text-[1.5rem] text-[#635950]">Votre panier est vide</p>
    </div>
    <div v-else>
      <div v-for="item in cart.items" :key="item.id" class="flex flex-row gap-6 mb-5">
        <div>
          <img
            :src="`${URL}${item.image_url}`"
            alt="Photo du meuble"
            class="w-48 h-48 object-cover rounded-lg"
          />
        </div>
        <div class="flex flex-col gap-2 items-center justify-center">
          <p class="font-[Anta] text-[1.2rem] text-[#635950]">
            {{ item.name }}
          </p>
          <p class="font-[Anta] text-[1.2rem] text-[#635950] italic">
            Prix de l''article : {{ item.price }} €
          </p>
        </div>
        <div class="flex items-center justify-center">
          <button
            @click.prevent="cart.removeItem(item.id)"
            class="cursor-pointer text-[0.8rem] border border-[#635950] rounded px-4 py-2 bg-[#A45338] text-[#FFF5E1] font-[Anta] hover:bg-[#8a3e27] transition"
          >
            Supprimer cet article
          </button>
        </div>
      </div>

      <hr />
      <div class="flex flex-row gap-20 items-center justify-center text-center">
        <p class="font-[Anta] text-[1.3rem] text-[#635950] mt-5 mb-5">
          Montant total du panier : {{ cart.totalPrice }} €
        </p>

        <button
          class="cursor-pointer border border-[#635950] rounded px-4 py-2 bg-[#A45338] text-[#FFF5E1] font-[Anta] hover:bg-[#8a3e27] transition"
          @click="payTheCard"
        >
          Passer au paiement
        </button>
      </div>
    </div>
  </div>
</template>
