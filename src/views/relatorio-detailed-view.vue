<template>
  <div class="prose max-w-none flex flex-col gap-4 items-center">
    <h1>Relatorio {{ props.id }}</h1>
    <p v-for="value, key in relatorio" :key="key">
      {{ key }}: {{ value }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { api } from '../utils/api';

const props = defineProps({
  id: String
})

const relatorio = ref()

onBeforeMount(async () => {
  relatorio.value = await api.get(`relatorios/${props.id}`)
  relatorio.value = relatorio.value.data
})

</script>

<style scoped></style>