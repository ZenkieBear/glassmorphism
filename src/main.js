import { createApp } from 'vue';
import App from './App.vue';
import router from '@routes/index.ts';
import '@assets/style/common.less';

const app = createApp(App)
.use(router);

app.mount('#app');
