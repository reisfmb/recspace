import { createWebHistory, createRouter } from "vue-router";

import Home from "../pages/Home.vue";
import Talent from "../pages/Talent.vue";
import Talents from "../pages/Talents.vue";
import AgencyForm from "../pages/AgencyForm.vue";
import Cast from "../pages/Cast.vue";
import About from "../pages/About.vue";
import Contact from "../pages/Contact.vue";

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
    {
        path: "/agencie-se",
        name: "AgencyForm",
        component: AgencyForm,
    },
    {
        path: "/monte-seu-cast",
        name: "Cast",
        component: Cast,
    },
    {
        path: "/quem-somos",
        name: "About",
        component: About,
    },
    {
        path: "/contato",
        name: "Contact",
        component: Contact,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;