<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue'

import HeaderCompo from './HeaderCompo.vue'
import FooterCompo from './FooterCompo.vue'
import FlashInfosFurniture from './FlashInfosFurniture.vue'
import FilterTypeColorMaterialCompo from './FilterTypeColorMaterialCompo.vue'

const API_URL = 'http://localhost:8080'

interface Color {
  id: number
  name: string
}

interface Type {
  id: number
  name: string
}

interface Material {
  id: number
  name: string
}

interface Furniture {
  id: number
  name: string
  description: string
  price: number
  status: string
  width: string
  height: string
  length: string
  type: string
  color: string
  material: string
  image: {
    id: number
    image_url: string
    alt_text: string
  }
}

const furnitures = ref<Furniture[]>([])

const selectedColor = ref<number | null>(null)
const selectedType = ref<number | null>(null)
const selectedMaterial = ref<number | null>(null)

const colors = ref<Color[]>([])
const types = ref<Type[]>([])
const materials = ref<Material[]>([])

const filteredFurnitures = computed(() => furnitures.value)

async function getFurniture() {
  try {
    const response = await fetch(`${API_URL}/furnitures`)
    if (!response.ok) throw new Error('Erreur lors du fetch des meubles')

    furnitures.value = await response.json()
  } catch (err) {
    console.error('❌ Erreur chargement des meubles :', err)
  }
}

async function filterFurniture(material: number | null, color: number | null, type: number | null) {
  try {
    const materialId = material ?? 'all'
    const colorId = color ?? 'all'
    const typeId = type ?? 'all'

    const response = await fetch(`${API_URL}/furnitures/filter/${materialId}/${colorId}/${typeId}`)
    if (!response.ok) throw new Error('Erreur filtre meubles')

    furnitures.value = await response.json()
  } catch (err) {
    console.error('❌ Erreur filtre meubles :', err)
  }
}

async function getColorFurniture() {
  try {
    const response = await fetch(`${API_URL}/color`)
    const data = await response.json()
    colors.value = data.sort((a: Color, b: Color) => a.name.localeCompare(b.name, 'fr'))
  } catch (e) {
    console.error('❌ Erreur couleurs :', e)
  }
}

async function getTypeFurniture() {
  try {
    const response = await fetch(`${API_URL}/type`)
    const data = await response.json()
    types.value = data.sort((a: Type, b: Type) => a.name.localeCompare(b.name, 'fr'))
  } catch (e) {
    console.error('❌ Erreur types :', e)
  }
}

async function getMaterialFurniture() {
  try {
    const response = await fetch(`${API_URL}/material`)
    const data = await response.json()
    materials.value = data.sort((a: Material, b: Material) => a.name.localeCompare(b.name, 'fr'))
  } catch (e) {
    console.error('❌ Erreur matériaux :', e)
  }
}

watch([selectedMaterial, selectedColor, selectedType], ([newMat, newColor, newType]) => {
  if (newMat !== null || newColor !== null || newType !== null) {
    filterFurniture(newMat, newColor, newType)
  } else {
    getFurniture()
  }
})

onMounted(() => {
  getFurniture()
  getColorFurniture()
  getTypeFurniture()
  getMaterialFurniture()
})
</script>

<template>
  <div class="bg-[#FFF5E1]">
    <HeaderCompo />

    <div class="flex flex-row bg-[#FFF5E1] gap-5 justify-center items-center">
      <p class="font-[Anta] text-[#A45338] text-[1.2rem]">Filtrer par :</p>

      <FilterTypeColorMaterialCompo
        elementAFiltrer="Matériaux"
        v-model="selectedMaterial"
        :elements="materials"
      />
      <FilterTypeColorMaterialCompo
        elementAFiltrer="Couleurs"
        v-model="selectedColor"
        :elements="colors"
      />
      <FilterTypeColorMaterialCompo
        elementAFiltrer="Types de meuble"
        v-model="selectedType"
        :elements="types"
      />
    </div>

    <!-- LISTE MEUBLES -->
    <FlashInfosFurniture :furnitures="filteredFurnitures" />
  </div>

  <FooterCompo />
</template>
