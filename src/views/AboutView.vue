<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { api } from '../utils/api'

onBeforeMount(async () => {
  try {
    const response = await api.login()
    localStorage.setItem('token', response?.token)
    localStorage.setItem('refreshToken', response?.refreshToken)
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
