<template>
  <div class="drawer w-full top-0 fixed">
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
          <ul v-if="props.userLoggedIn" class="menu menu-horizontal px-1 gap-3">
            <li>
              <label class="swap swap-rotate w-9 h-9" title="Trocar Tema" aria-label="Trocar Tema">
                <input type="checkbox" :checked="isDark" @change="toggleTheme" class="theme-controller"
                  value="seashells" />
                <span class="material-symbols-outlined swap-on fill-current">
                  dark_mode
                </span>
                <span class="material-symbols-outlined swap-off fill-current">
                  light_mode
                </span>
              </label>
            </li>
            <li class="hidden sm:block"><router-link class="nav-link" to="/">Início</router-link></li>
            <li class="hidden sm:block"><router-link class="nav-link" to="/relatorios/">Relatórios</router-link></li>
            <li class="hidden sm:block"><router-link class="nav-link" to="/settings/">Configurações</router-link></li>
            <li class="hidden sm:block"><button onclick="logout_modal.showModal()">Log out</button></li>
          </ul>
          <ul v-else class="menu menu-horizontal px-1 gap-3">
            <li>
              <label class="swap swap-rotate w-9 h-9" title="Trocar Tema" aria-label="Trocar Tema">
                <input type="checkbox" :checked="isDark" @change="toggleTheme" class="theme-controller"
                  value="seashells" />
                <span class="material-symbols-outlined swap-on fill-current">
                  dark_mode
                </span>
                <span class="material-symbols-outlined swap-off fill-current">
                  light_mode
                </span>
              </label>
            </li>
            <li class="hidden sm:block"><router-link class="nav-link" to="/login/">Log in</router-link></li>
            <li class="hidden sm:block"><router-link class="nav-link" to="/register/">Sign up</router-link></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="drawer-side">
      <label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul v-if="props.userLoggedIn" class="menu p-4 w-60 min-h-full bg-base-200">
        <li><router-link to="/">Início</router-link></li>
        <li><router-link to="/relatorios/">Relatórios</router-link></li>
        <li><router-link to="/settings/">Configurações</router-link></li>
        <li><button @click="logout">Log out</button></li>
      </ul>
      <ul v-else class="menu p-4 w-60 min-h-full bg-base-200">
        <li><router-link to="/login">Log in</router-link></li>
        <li><router-link to="/register/">Sign up</router-link></li>
      </ul>
    </div>
  </div>
  <dialog id="logout_modal" class="modal modal-bottom sm:modal-middle font-open-sans">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Log out</h3>
      <p class="py-4">Você tem certeza que deseja sair?</p>
      <div class="modal-action">
        <form class="flex gap-2" method="dialog">
          <button class="btn btn-primary" @click="logout">Sair</button>
          <button class="btn">Cancelar</button>
        </form>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

const props = defineProps({
  userLoggedIn: Boolean
})

const emit = defineEmits(['logout'])

function logout(event: Event) {
  emit('logout', event)
}

const isDark = ref(localStorage.getItem('theme') === 'dark')

const toggleTheme = () => {
  if (isDark.value) {
    localStorage.setItem('theme', 'light')
  } else {
    localStorage.setItem('theme', 'dark')
  }
}

</script>

<style lang="scss">
@import '@/assets/component-styles/top-bar.scss';
</style>