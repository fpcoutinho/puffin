<template>
  <div class="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
    <div class="text-center">
      <p class="font-semibold text-error">404</p>
      <h1 class="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
        Página não Encontrada
      </h1>
      <p class="mt-6 text-base leading-7 ">
        Sinto muito, não encontramos a página que você estava procurando.
      </p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <router-link to="/" class="btn btn-error">Voltar
          para o início</router-link>
        <router-link to="help">Mais informações<span aria-hidden="true">&rarr;</span></router-link>
      </div>
    </div>
  </div>
</template>