<template>
    <div class="menu">
        <div>
            <router-link :to="{ name: 'Home' }">
                <img class="menu__logo" :src="logo" alt="Logo" />
            </router-link>
        </div>
        <div>
            <div class="menu__links">
                <router-link v-for="link in links" :to="{ name: link.routeName }">{{ link.title }}</router-link>
            </div>
            <div class="menu__filters">
                <input type="text" placeholder="Nome" v-model="selectedName" />
                <MultiSelect placeholder="Vozes" :options="voices" v-model="selectedVoices" />
                <MultiSelect
                    placeholder="Tipos de locução"
                    :options="locutionTypes"
                    v-model="selectedLocutionTypes"
                />
                <a :href="$router.resolve({ name: 'Talents', query: queryObj }).href">
                    <button>Filtrar</button>
                </a>
            </div>
        </div>
        <div class="menu__socials">
            <a v-for="social in socials" :href="social.href">
                <i :class="social.icon"></i>
            </a>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import MultiSelect from './Multiselect.vue';

import { getLocutionTypes } from "../util";
import { ILocutionType } from "../util/interfaces";

import logo from '../assets/logo.png';

export default defineComponent({
    components: { MultiSelect },
    data: () => ({
        logo,
        links: [
            { title: 'Talentos', routeName: 'Talents' },
            /* { title: 'Agencie-se', routeName: '#' },
            { title: 'Quem Somos', routeName: '#' },
            { title: 'Contato', routeName: '#' }, */
        ],
        socials: [
            { icon: 'fab fa-youtube', href: '#' },
            { icon: 'fab fa-instagram', href: '#' },
            { icon: 'fab fa-facebook', href: '#' },
        ],

        voices: ['masculino', 'feminino'],
        locutionTypes: [],

        selectedName: '',
        selectedVoices: '',
        selectedLocutionTypes: '',
    }),
    async mounted() {
        try {
            this.locutionTypes = (await getLocutionTypes()).data
                .map((lt: ILocutionType) => lt.attributes.type);
        } catch (error) {
            console.log(`Error when trying to get locution types`, error);
        }
    },
    computed: {
        queryObj() {
            let queryObj = {} as any;

            this.selectedName && (queryObj.name = this.selectedName);
            this.selectedVoices.length > 0 && (queryObj.voices = this.selectedVoices/* .join('+') */);
            this.selectedLocutionTypes.length > 0 && (queryObj.locutionTypes = this.selectedLocutionTypes/* .join('+') */);

            return queryObj;
        }
    }
})

</script>

<style scoped>
.menu {
    padding: 20px 0px;
    background-color: var(--blue1);
    display: flex;
    justify-content: space-between;
}

.menu > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.menu div:last-child {
    flex-direction: row;
}

.menu__logo {
    width: 150px;
    padding: 20px;
    margin-left: 50px;
}

.menu__links {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    text-transform: uppercase;
    margin-bottom: 20px;
}
.menu__links a {
    color: white;
    text-decoration: none;
    letter-spacing: 2px;
    transition: 0.3s ease-in-out;
}
.menu__links a:hover {
    margin-top: -5px;
    color: var(--pink);
    font-weight: 700;
}

.menu__filters {
    border-top: 1px solid var(--blue2);
    padding-top: 20px;
}
.menu__filters input {
    margin: 0px 10px;
    padding: 5px;
    border: none;
}
.menu__filters button {
    margin: 0px 10px;
    padding: 5px;
    border: none;
    text-transform: uppercase;
}

.menu__socials a {
    margin: 0px 10px;
    color: white;
    text-decoration: none;
    transition: 0.3s ease-in-out;
}
.menu__socials a:hover {
    color: var(--blue1);
}
.menu__socials a:last-child {
    margin-right: 50px;
}
.menu__socials i {
    background-color: var(--pink);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    font-size: 18px;
    border-radius: 50%;
}
</style>
