<template>
  <div class="carousel w-full">
    <div v-for="imagem, index in  props.imagens" :key="imagem.id" :id="'slide' + index"
      class="carousel-item relative w-full">
      <img :src="imagem.img" class="w-full" />
      <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <a v-if="(index - 1) > 0" :href="'#slide' + (index - 1)" class="btn btn-circle">❮</a>
        <a v-else :href="'#slide' + (props.imagens.length - 1)" class="btn btn-circle">❮</a>
        <a v-if="(index + 1) < props.imagens.length" :href="'#slide' + (index + 1)" class="btn btn-circle">❯</a>
        <a v-else href="#slide0" class="btn btn-circle">❯</a>
      </div>
    </div>
  </div>
  <div class="flex justify-center w-full py-2 gap-2">
    <a v-for="imagem, index in  imagens" :key="imagem.id" :href="'#slide' + index" class="btn btn-xs">{{ index + 1 }}</a>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  imagens: {
    type: Array as () => { id: string; img: string }[],
    required: true
  }
})

</script>

<style>
@import '@/assets/component-styles/carousel.scss';
</style>
