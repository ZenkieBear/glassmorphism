// components
import { createApp } from 'vue';
import App from './App.vue';
import router from '@/routes/index';
import i18n from '@/assets/lang/index';
// styles
import '@/assets/style/common.less';
import '@/assets/style/fonts.css';
import '@/assets/style/fontawesome/css/fontawesome.css';
import '@/assets/style/fontawesome/css/brands.css';
import '@/assets/style/fontawesome/css/solid.css';

const app = createApp(App).use(router).use(i18n);

app.mount('#app');
