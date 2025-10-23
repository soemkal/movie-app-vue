import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap" // Opsionalm jika butuh JS Bootstrap

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
