import { createRouter, createWebHistory } from 'vue-router'
import Login from 'forms/auth/SdlLoginForm.vue'
import Register from 'forms/auth/SdlRegisterForm.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Login,
    },
    {
      path: '/register',
      component: Register,
    },
  ],
})
