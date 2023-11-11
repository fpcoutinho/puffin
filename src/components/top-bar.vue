<template>
  <div class="drawer">
    <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <!-- Navbar -->
      <div class="navbar bg-neutral shadow-lg">
        <div class="flex-none sm:hidden">
          <label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost">
            <span class="material-symbols-outlined">
              menu
            </span>
          </label>
        </div>
        <div class="flex-1">
          <router-link to="/" class="flex gap-3 items-center">
            <img width="48" src="@\assets\icons\tucano.png" alt="puffin icon">
            <span class="font-yellowtail text-4xl">Tucán</span>
          </router-link>
        </div>
        <div class="flex-none">
          <ul class="menu menu-horizontal px-1 gap-3">
            <li>
              <label class="swap swap-rotate w-9 h-9" title="Trocar Tema" aria-label="Trocar Tema">
                <input type="checkbox" data-toggle-theme="seashells,sunrise" data-act-class="ACTIVECLASS" />
                <span class="material-symbols-outlined swap-on fill-current">
                  light_mode
                </span>
                <span class="material-symbols-outlined swap-off fill-current">
                  dark_mode
                </span>
              </label>
            </li>
            <li class="hidden sm:block"><router-link class="nav-link" to="/">Início</router-link></li>
            <li class="hidden sm:block"><router-link class="nav-link" to="/relatorios/">Relatórios</router-link></li>
            <li class="hidden sm:block"><router-link class="nav-link" to="/settings/">Configurações</router-link></li>
            <li class="hidden sm:block"><button @click="logout">Log out</button></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="drawer-side">
      <label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu p-4 w-60 min-h-full bg-base-200">
        <li><router-link to="/">Início</router-link></li>
        <li><router-link to="/relatorios/">Relatórios</router-link></li>
        <li><router-link to="/settings/">Configurações</router-link></li>
        <li><button @click="logout">Log out</button></li>
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

const emit = defineEmits(['logout'])

function logout(event: Event) {
  emit('logout', event)
}

</script>

<style lang="scss">
@import '@/assets/component-styles/top-bar.scss';
</style>