<template>
  <div class="drawer">
    <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <!-- Navbar -->
      <div class="navbar bg-neutral shadow-lg rounded-3xl p-3">
        <div class="flex-none sm:hidden">
          <label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost">
            <i class="fa-solid fa-bars fa-xl"></i>
          </label>
        </div>
        <div class="flex-1">
          <router-link to="#" class="btn btn-ghost btn-circle normal-case text-xl">
            <img src="@\assets\icons\tucano.png" alt="puffin icon">
          </router-link>
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
            <li class="hidden sm:block"><router-link to="#inicio">Início</router-link></li>
            <li class="hidden sm:block"><router-link to="#configuracoes">Configurações</router-link></li>
            <li class="hidden sm:block"><router-link to="#logout">Log out</router-link></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="drawer-side">
      <label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu p-4 w-60 min-h-full bg-base-200">
        <li><router-link to="#inicio">Início</router-link></li>
        <li><router-link to="#configuracoes">Configurações</router-link></li>
        <li><router-link to="#logout">Log out</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { themeChange } from 'theme-change'
import { onMounted } from 'vue'

onMounted(() => {
  themeChange(false)
})

</script>

<style lang="scss">
@import '@/assets/component-styles/top-bar.scss';
</style>