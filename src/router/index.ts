import { createRouter, createWebHistory } from 'vue-router'
import { api } from '@/utils/api'

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
      path: '/login/',
      name: 'login',
      component: () => import('../views/login-view.vue')
    },
    {
      path: '/register/',
      name: 'register',
      component: () => import('../views/register-view.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/error-view.vue')
    },
  ]
})

router.beforeEach(async (to) => {
  if (
    !api.checkIfLoggedIn &&
    (to.name !== 'login' && to.name !== 'register')
  ) {
    // redirect the user to the login page
    return { name: 'login' }
  }
})

export default router
