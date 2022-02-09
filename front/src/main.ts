import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
createApp(App).use(router).mount('#app');

import bgImage from './assets/bg.png';
document.body.style.backgroundColor = 'darkgray';
document.body.style.background = `url('${bgImage}') no-repeat center center fixed`;
document.body.style.backgroundSize = `cover`;
