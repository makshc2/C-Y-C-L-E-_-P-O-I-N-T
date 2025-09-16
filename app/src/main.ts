import { createApp } from 'vue'
import App from './App.vue'

import { Quasar } from 'quasar'
import 'quasar/src/css/index.sass'
import '@quasar/extras/material-icons/material-icons.css'
import router from './router'

const app = createApp(App)
app.use(Quasar, { plugins: {} })
app.use(router)
app.mount('#app')
