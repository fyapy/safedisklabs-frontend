import { createRouter, createWebHistory } from 'vue-router'
import Login from 'forms/auth/SdlLoginForm.vue'
import Register from 'forms/auth/SdlRegisterForm.vue'
import Dashboard from 'modules/Dashboard.vue'
import { guestGuard, authGuard } from 'utils/guards'

export type FilesListType = 'dashboard' | 'starred' | 'hidden' | 'bin'
const fileTypes = 'dashboard|hidden|starred|bin'

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
      path: `/:type(${fileTypes})`,
      component: Dashboard,
      beforeEnter: authGuard,
    },
    {
      path: `/:type(${fileTypes})/:fileType(file|folder)/:id`,
      component: Dashboard,
      beforeEnter: authGuard,
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('./modules/NotFound.vue'),
    },
  ],
})
