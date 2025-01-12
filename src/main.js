import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Import Bootstrap CSS
// import 'bootstrap/dist/css/bootstrap.min.css';

// Import Bootstrap JavaScript
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import 'jquery'
// import 'popper.js'

//Sakai
import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';


import './assets/styles.scss';
import './assets/tailwind.css';
// import '@/assets/styles.scss';
// import '@/assets/tailwind.css';


const app = createApp(App)
app.use(ToastService);
app.use(ConfirmationService);
app.use(createPinia())
app.use(router)

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.app-dark'
        }
    }
});



app.mount('#app')
