import 'element-plus/theme-chalk/dark/css-vars.css'
import './assets/main.css'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import ptBr from 'element-plus/dist/locale/pt-br.mjs'

import App from './App.vue'
import router from './router'
import { createApp } from 'vue'

const app = createApp(App)

app.use(ElementPlus, { locale: ptBr })
app.use(router)

app.mount('#app')
