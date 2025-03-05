import { createApp } from 'vue'
// import the root component App from a single-file component.
import App from './components/Home.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles.css'

const app = createApp(App)
    
app.mount("#app")