<script setup lang="ts">
import { RouterView } from 'vue-router';
import TopNav from '@/components/top-nav.vue'
import FooterNav from '@/components/footer-nav.vue'
import { api } from '@/utils/api'
import { onBeforeMount, ref } from 'vue';
import router from './router';

const userLoggedIn = ref(false)

onBeforeMount(async () => {
  const loggedIn = await api.checkIfLoggedIn()
  if (!loggedIn) {
    router.push('/login')
  } else {
    userLoggedIn.value = true
  }
})

const loginUser = () => {
  userLoggedIn.value = true
}

const logoutApi = async () => {
  await api.logout()
  userLoggedIn.value = false
  router.push('/login')
}
</script>

<template>
  <header>
    <top-nav :user-logged-in="userLoggedIn" @logout="logoutApi" />
  </header>
  <main>
    <router-view @login="loginUser" />
  </main>
  <footer>
    <footer-nav />
  </footer>
</template>
