<script setup lang="ts">
import { RouterView } from 'vue-router';
import TopBar from '@/components/top-bar.vue'
import FooterNav from '@/components/footer-nav.vue'
import { api } from '@/utils/api'
import { onBeforeMount } from 'vue';

onBeforeMount(async () => {
  const loggedIn = await api.checkIfLoggedIn()
  if (!loggedIn) {
    //router.push({ name: 'login' })
    await api.login()
  }
})

const logoutApi = async () => {
  await api.logout()
}
</script>

<template>
  <header>
    <top-bar @logout="logoutApi" />
  </header>
  <main>
    <router-view />
  </main>
  <footer>
    <footer-nav />
  </footer>
</template>
