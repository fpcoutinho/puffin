<template>
  <form class="prose max-w-none flex flex-col gap-5 items-center" @submit="login">
    <h2 class="text-primary">Log in</h2>
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text font-bold">Nome de usuário</span>
      </label>
      <input type="text" name="username" placeholder="Digite seu nome de usuário..."
        class="input input-bordered w-full max-w-xs" />
    </div>
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text font-bold">Senha</span>
      </label>
      <input type="password" name="password" placeholder="Digite sua senha..."
        class="input input-bordered w-full max-w-xs" />
    </div>
    <div class="form-control w-full h-3 max-w-xs text-center text-error text-xs">
      {{ formError }}
    </div>
    <div class="form-control w-full max-w-xs">
      <button class="btn btn-primary" type="submit">
        Entrar
      </button>
    </div>
    <div class="form-control w-full max-w-xs flex flex-row justify-around items-center">Não tem uma conta?
      <router-link class="btn btn-ghost" to="/register">Cadastre-se <span aria-hidden="true">&rarr;</span></router-link>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { api } from '@/utils/api';
import router from '@/router';

const formError = ref('')

const login = async (e: Event) => {
  e.preventDefault()
  const form = e.target as HTMLFormElement
  formError.value = ''
  const username = form.username.value
  const password = form.password.value

  try {
    const res = await api.login(username, password) as any
    if (res.status === 200) {
      router.push('/')
    } else {
      formError.value = res.statusText
    }
  } catch (err) {
    console.log(err)
  }
}
</script>