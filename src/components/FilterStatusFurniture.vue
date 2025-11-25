<script setup lang="ts">
import { defineEmits } from 'vue'

const props = defineProps<{
  modelValue: string[]
}>()

const emit = defineEmits(['update:modelValue'])

function toggleStatus(status: string, event: Event) {
  const checked = (event.target as HTMLInputElement).checked
  const updated = [...props.modelValue]

  if (checked) {
    if (!updated.includes(status)) updated.push(status)
  } else {
    const index = updated.indexOf(status)
    if (index !== -1) updated.splice(index, 1)
  }

  emit('update:modelValue', updated)
}
</script>

<template>
  <div class="flex flex-row gap-5 justify-center items-center">
    <p class="font-[Anta] text-[1.1rem] text-[#A45338]">Cochez les meubles avec le statut :</p>

    <div class="flex flex-row gap-1 font-[Anta] text-[1.1rem] text-[#A45338]">
      <input
        type="checkbox"
        id="on_hold"
        value="on_hold"
        :checked="modelValue.includes('on_hold')"
        @change="toggleStatus('on_hold', $event)"
      />
      <label for="on_hold">En attente de validation</label>
    </div>

    <div class="flex flex-row gap-1 font-[Anta] text-[1.1rem] text-[#A45338]">
      <input
        type="checkbox"
        id="validated"
        value="validated"
        :checked="modelValue.includes('validated')"
        @change="toggleStatus('validated', $event)"
      />
      <label for="validated">Meuble validé</label>
    </div>

    <div class="flex flex-row gap-1 font-[Anta] text-[1.1rem] text-[#A45338]">
      <input
        type="checkbox"
        id="rejected"
        value="rejected"
        :checked="modelValue.includes('rejected')"
        @change="toggleStatus('rejected', $event)"
      />
      <label for="rejected">Meuble refusé</label>
    </div>

    <div class="flex flex-row gap-1 font-[Anta] text-[1.1rem] text-[#A45338]">
      <input
        type="checkbox"
        id="sold"
        value="SOLD"
        :checked="modelValue.includes('SOLD')"
        @change="toggleStatus('SOLD', $event)"
      />
      <label for="sold">Meubles vendus</label>
    </div>
  </div>
</template>
