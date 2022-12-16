import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import Welcome from '@views/Welcome.vue';
import Home from '@views/Home.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            alias: ['/welcome', '/index', '/index.html', '/index.htm'],
            component: Welcome
        },
        {
            path: '/home',
            component: Home
        }
    ]
})

export default router;