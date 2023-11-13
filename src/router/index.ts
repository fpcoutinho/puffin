import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home-view.vue')
    },
    {
      path: '/relatorios/',
      name: 'relatorios',
      component: () => import('../views/relatorios-view.vue')
    },
    {
      path: '/relatorios/:id',
      name: 'relatorio',
      component: () => import('../views/relatorio-detailed-view.vue'),
      props: true
    },
    {
      path: '/settings/',
      name: 'settings',
      component: () => import('../views/settings-view.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/error-view.vue')
    },
  ]
})

export default router
