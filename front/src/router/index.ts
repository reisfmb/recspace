import { createWebHistory, createRouter } from "vue-router";

import Home from "../pages/Home.vue";
import Talent from "../pages/Talent.vue";
import Talents from "../pages/Talents.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/talento/:id",
        name: "Talent",
        component: Talent,
        props: true,
    },
    {
        path: "/talentos",
        name: "Talents",
        component: Talents,
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;