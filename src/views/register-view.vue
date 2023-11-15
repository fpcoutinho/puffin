<template>
  <div class="flex justify-center">
    <form class="prose flex flex-col gap-2" @submit="register">
      <h2 class="text-primary text-center">Sign Up</h2>
      <div class="flex flex-row gap-4 mb-2">
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
      <ul class="label-text-alt text-error m-0">
        <li class="not-prose my-2 pl-1" v-for="error in errors.username" :key="error">{{ error }}</li>
      </ul>
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text font-bold">E-mail</span>
        </label>
        <input type="text" name="email" placeholder="Digite seu email..." class="input input-bordered w-full" />
      </div>
      <ul class="label-text-alt text-error m-0">
        <li class="not-prose my-2 pl-1" v-for="error in errors.email" :key="error">{{ error }}</li>
      </ul>
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
      <ul class="label-text-alt text-error m-0">
        <li class="not-prose my-2 pl-1" v-for="error in errors.password" :key="error">{{ error }}</li>
      </ul>
      <span class="label-text-alt text-error">{{ passwordVerify }} </span>
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


const errors = ref({
  username: null,
  email: null,
  password: null
})

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
  const username = form.username.value
  const password = form.password.value
  const password2 = form.password2.value
  const first_name = form.first_name.value
  const last_name = form.last_name.value
  const email = form.email.value

  try {
    const res = await api.register(username, password, password2, email, first_name, last_name) as any

    if (res.status === 201) {
      await api.login(username, password)
      router.push('/')
    } else if (res.status === 400) {
      const keys = Object.keys(res.data)
      keys.forEach((key,) => {
        if (key === 'username') {
          errors.value.username = res.data[key]
        }
        if (key === 'email') {
          errors.value.email = res.data[key]
        }
        if (key === 'password') {
          errors.value.password = res.data[key]
        }
      });
    }
    else {
      console.log(res)
    }
  } catch (err) {
    console.log(err)
  }
}
</script>