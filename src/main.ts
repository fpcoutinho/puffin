import './assets/main.scss'

import { createApp } from 'vue'
import '@fontsource/material-symbols-outlined';
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
