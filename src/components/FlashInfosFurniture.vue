<script setup lang="ts">
import { onMounted } from 'vue'

async function getFurniture() {
  try {
    const response = await fetch(`${URL}/furniture/color`)
    return (furniture.value = await response.json())
  } catch (error) {
    console.error('Erreur chargement des meubles en vente :', error)
  }
}

onMounted(() => {
  getFurniture()
})
</script>

<template>
  <div v-for="element in furniture" :key="element.id">
    <p>{{ element.name }}</p>
    <p>{{ element.description }}</p>
    <p>{{ element.width }}x{{ element.height }}x{{ element.length }}</p>
    <h1>{{ element.price }}</h1>
    <p>Voir plus d'informations sur le produit...</p>
    <button type="button">ACHETER</button>
  </div>
</template>
