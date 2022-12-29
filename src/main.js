import {
    createApp
} from 'vue'
import "./index.css"
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config';

const app = createApp(App);
app.use(PrimeVue);
app.use(router)

app.mount('#app')