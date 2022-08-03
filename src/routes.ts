import { createRouter, createWebHistory } from 'vue-router'
import Login from 'forms/auth/SdlLoginForm.vue'
import Register from 'forms/auth/SdlRegisterForm.vue'
import Dashboard from 'modules/Dashboard.vue'
import { guestGuard, authGuard } from 'utils/guards'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Login,
      beforeEnter: guestGuard,
    },
    {
      path: '/register',
      component: Register,
      beforeEnter: guestGuard,
    },
    {
      path: '/dashboard',
      component: Dashboard,
      beforeEnter: authGuard,
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('./modules/NotFound.vue'),
    },
  ],
})
