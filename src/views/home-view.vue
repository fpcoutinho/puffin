<script setup lang="ts">
import { RouterView } from 'vue-router';
import TopBar from '@/components/top-bar.vue'
import FooterNav from '@/components/footer-nav.vue'
</script>

<template>
  <header>
    <top-bar />
  </header>
  <main>
    <router-view />
  </main>
  <footer>
    <footer-nav />
  </footer>
</template>
