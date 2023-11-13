<script setup lang="ts">
import { RouterView } from 'vue-router';
import TopNav from '@/components/top-nav.vue'
import FooterNav from '@/components/footer-nav.vue'
import { api } from '@/utils/api'
import { onBeforeMount } from 'vue';
import router from './router';

onBeforeMount(async () => {
  const loggedIn = await api.checkIfLoggedIn()
  if (!loggedIn) {
    router.push('/login')
  }
})

const logoutApi = async () => {
  await api.logout()
  router.push('/login')
}
</script>

<template>
  <header>
    <top-nav @logout="logoutApi" />
  </header>
  <main>
    <router-view />
  </main>
  <footer>
    <footer-nav />
  </footer>
</template>
