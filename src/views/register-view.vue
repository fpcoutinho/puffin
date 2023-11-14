<template>
  <div class="flex justify-center">
    <div v-show="formError !== ''" class="alert alert-error">
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{{ formError }}</span>
    </div>
    <form class="prose flex flex-col gap-5" @submit="register">
      <h2 class="text-primary text-center">Sign Up</h2>
      <div class="flex flex-row gap-4">
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text font-bold">Nome</span>
          </label>
          <input type="text" name="first_name" placeholder="Digite seu nome..." class="input input-bordered w-full" />
        </div>
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text font-bold">Sobrenome</span>
          </label>
          <input type="text" name="last_name" placeholder="Digite seu sobrenome..." class="input input-bordered w-full" />
        </div>
      </div>
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text font-bold">Nome de usuário</span>
        </label>
        <input type="text" name="username" placeholder="Digite seu nome de usuário..."
          class="input input-bordered w-full" />
      </div>
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text font-bold">E-mail</span>
        </label>
        <input type="text" name="email" placeholder="Digite seu email..." class="input input-bordered w-full" />
      </div>
      <div class="flex flex-row gap-4">
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text font-bold">Senha</span>
          </label>
          <input type="password" name="password" v-model="senha" placeholder="Digite sua senha..."
            class="input input-bordered w-full" />
        </div>
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text font-bold">Confirmar Senha</span>
          </label>
          <input type="password" name="password2" v-model="senha2" placeholder="Confirme sua senha..."
            class="input input-bordered w-full" />
        </div>
      </div>
      <div class="form-control w-full h-3 text-center text-error text-xs">
        {{ passwordVerify }}
      </div>
      <div class="form-control w-full">
        <button class="btn btn-primary" type="submit" :disabled="disabled">
          Registrar-se
        </button>
      </div>
      <div class="form-control w-full flex flex-row justify-around items-center">Já é cadastrado?
        <router-link class="btn btn-ghost" to="/login">Log in <span aria-hidden="true">&rarr;</span></router-link>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { api } from '@/utils/api';
import router from '@/router';

const formError = ref('')
const senha = ref('')
const senha2 = ref('')

const passwordVerify = computed(() => {
  if (!(senha.value === '' && senha2.value === '')) {
    if ((senha.value !== senha2.value)) {
      return 'As senhas não coincidem'
    }
    if (senha.value.length < 8) {
      return 'A senha deve ter no mínimo 8 caracteres'
    }
  }
  return ''
})

const disabled = computed(() => {
  return passwordVerify.value !== ''
})


const register = async (e: Event) => {
  e.preventDefault()
  const form = e.target as HTMLFormElement
  formError.value = ''
  const username = form.username.value
  const password = form.password.value
  const password2 = form.password2.value
  const first_name = form.first_name.value
  const last_name = form.last_name.value
  const email = form.email.value

  try {
    const res = await api.register(username, password, password2, email, first_name, last_name) as any
    if (res.status === 200) {
      await api.login(username, password)
      router.push('/')
    } else {
      formError.value = res.statusText
    }
  } catch (err) {
    console.log(err)
  }
}
</script>