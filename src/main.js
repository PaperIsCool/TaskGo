import { createApp } from 'vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles.css';
import App from './App.vue';
import router from './router';
import { app as firebaseApp } from './firebase';

const vueApp = createApp(App);

vueApp.use(router);

vueApp.mount('#app');

console.log('Firebase app initialized:', firebaseApp); //Optional test log