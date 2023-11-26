<template>
  <div class="prose max-w-none flex flex-col gap-4 items-center">
    <h1>Relatorio {{ props.id }}</h1>
    <p><b>Data:</b> {{ data() }}</p>
    <p><b>Hora:</b> {{ hora() }}</p>
    <p><b>Local:</b> {{ relatorio.local }}</p>
    <p><b>Temperatura:</b> {{ relatorio.temperatura }} °C</p>
    <p><b>Condições Climáticas:</b> {{ relatorio.clima }} </p>
    <p><b>Responsáveis pela Inspeção:</b> {{ relatorio.responsaveis }}</p>

    <div v-if="showImagens()">
      <h3>Imagens</h3>
      <image-carousel :imagens="imagens" />
    </div>
    <div v-if="showCircuitos()">
      <h2>Circuitos</h2>
      <div class="grid grid-cols-2 gap-4">
        <div v-for="circuito in circuitos" :key="circuito">
          <p>{{ circuito }}</p>
        </div>
      </div>
    </div>
    <p v-for="value, key in relatorio" :key="key">
      {{ key }}: {{ value }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { api } from '../utils/api';
import { format } from '../utils/format';
import ImageCarousel from '@/components/image-carousel.vue';

const props = defineProps({
  id: String
})

const relatorio = ref<any>({})
const imagens = ref<{ id: string; img: string }[]>([])
const circuitos = ref([])

onBeforeMount(async () => {
  const relatorioResponse = await api.get(`relatorios/${props.id}`)
  relatorio.value = relatorioResponse?.data

  const imagensResponse = await api.get(`relatorios/${props.id}/imagens`)
  imagens.value = imagensResponse?.data.results

  const circuitosResponse = await api.get(`relatorios/${props.id}/circuitos`)
  circuitos.value = circuitosResponse?.data.results
})

const data = () => {
  return format.data(relatorio.value.data).split('às')[0]
}

const hora = () => {
  return format.data(relatorio.value.data).split('às')[1]
}

const showImagens = () => {
  return imagens.value.length > 0
}

const showCircuitos = () => {
  return circuitos.value.length > 0
}
</script>
