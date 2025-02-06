import { createRouter, createWebHistory } from 'vue-router';

import Home from "./pages/Home.vue";
import DefaultLayout from "./components/DefaultLayout.vue";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";

const routes = [
    {
        path: '/',
        
        component: DefaultLayout,

        children: [
            {path: '/', name: 'Home', component: Home},

        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFound
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;