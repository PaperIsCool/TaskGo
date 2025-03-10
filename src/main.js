import { createApp } from 'vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles.css';
import App from './App.vue';
import router from './router';
import { firestorePlugin } from 'vuefire';

// Create and mount the app
const app = createApp(App);

app.use(router);
app.use(firestorePlugin);

app.mount('#app');