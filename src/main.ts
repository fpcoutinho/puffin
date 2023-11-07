import './assets/main.css'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import ptBr from 'element-plus/dist/locale/pt-br.mjs'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(ElementPlus, { locale: ptBr })
app.use(router)

app.mount('#app')
