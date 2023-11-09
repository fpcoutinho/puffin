<template>
  <div class="navbar bg-base-100 shadow-lg rounded-3xl p-3">
    <div class="flex-1">
      <router-link to="#" class="btn btn-ghost normal-case text-xl">daisyUI</router-link>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1 gap-3">
        <li>
          <label class="swap swap-rotate w-9 h-9">
            <input type="checkbox" data-toggle-theme="seashells,sunrise" data-act-class="ACTIVECLASS" />
            <i class="fa-regular fa-moon fa-xl swap-on fill-current"></i>
            <i class="fa-regular fa-sun fa-xl swap-off fill-current"></i>
          </label>
        </li>
        <li><router-link to="#">Início</router-link></li>
        <li><router-link to="#">Configurações</router-link></li>
        <li><router-link to="#">Log out</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { themeChange } from 'theme-change'
import { onMounted } from 'vue';

onMounted(() => {
  themeChange(false);
});

</script>

<style lang="scss">
@import '@/assets/component-styles/top-bar.scss';
</style>