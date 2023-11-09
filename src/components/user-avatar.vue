<template>
  <label v-if="props.imgSrc" tabindex="0" class="btn btn-ghost btn-circle avatar">
    <div class="w-10 rounded-full">
      <img :src="props.imgSrc" />
    </div>
  </label>
  <label v-else tabindex="0" class="btn btn-ghost btn-circle avatar placeholder">
    <span class="text-2xl">{{ iniciais }}</span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  nome: {
    type: String,
    required: true,
    validator: (propValue: string) => {
      return (/^[a-z ,.'-]+$/i).test(propValue)
    }
  },
  imgSrc: {
    type: String,
  },
})



const iniciais = computed(() => {
  const names = props.nome.split(' ')
  return names.map((nome) => nome[0].toUpperCase()).join('')
})
</script>

<style scoped></style>