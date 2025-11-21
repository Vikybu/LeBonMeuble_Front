<script setup lang="ts">
import { ref } from 'vue'

interface Element {
  id: number
  name: string
}

const props = defineProps<{
  elementAFiltrer: string
  elements: Element[]
}>()

const selectedElement = ref('')
</script>

<template>
  <div>
    <label class="text-[#A45338] font-[Anta]">{{ elementAFiltrer }}</label>
    <select
      v-model="selectedElement"
      class="border border-[#A45338] rounded-lg px-3 py-2 w-full bg-[#A45338] text-[#FFF5E1] font-[Anta] focus:ring-2 focus:ring-[#A45338]"
    >
      <option class="text-[#A45338] font-[Anta]" value="">Tous sélectionner</option>
      <option v-for="element in props.elements" :key="element.id" :value="element.id">
        {{ element.name }}
      </option>
    </select>
  </div>
</template>
