import { createRouter, createWebHashHistory } from 'vue-router';
import Welcome from '@views/Welcome.vue';
import Home from '@views/Home.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            // alias: ['/welcom'],
            component: Welcome
        },
        {
            path: '/home',
            component: Home
        }
    ]
})

export default router;