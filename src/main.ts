import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './routes'

import './styles/main.scss'

createApp(App)
  .use(router)
  .use(createPinia())
  .mount('#app')
