<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import { onBeforeMount } from 'vue'
import { api } from '../service/api.js'

onBeforeMount(async () => {
  const { token, refreshToken } = await api.login()
  localStorage.setItem('token', token);
  localStorage.setItem('refreshToken', refreshToken);
})
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
