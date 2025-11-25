<script setup lang="ts">
interface Element {
  id: number
  name: string
}

const props = defineProps<{
  modelValue: string | number | null
  elementAFiltrer: string
  elements: Element[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | null): void
}>()
</script>

<template>
  <div>
    <label class="text-[#A45338] font-[Anta] text-[1.2rem]">{{ elementAFiltrer }}</label>
    <select
      :value="props.modelValue"
      @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      class="border border-[#A45338] rounded-lg px-3 py-2 w-full bg-[#A45338] text-[#FFF5E1] font-[Anta] focus:ring-2 focus:ring-[#A45338]"
    >
      <option class="text-[#FFF5E1] font-[Anta]" value="all">Tous sélectionner</option>
      <option v-for="element in props.elements" :key="element.id" :value="element.id">
        {{ element.name }}
      </option>
    </select>
  </div>
</template>
