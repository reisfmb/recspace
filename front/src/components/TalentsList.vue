<template>
    <div class="talents__list">
        <template v-for="talent in talents">
            <router-link :to="{ name: 'Talent', params: { id: talent.id } }">
                <div class="talent__card">
                    <img
                        :src="getTalentImage(talent.id)"
                        :alt="'Rec Space ' + talent.attributes.name"
                    />
                    <h3>{{ talent.attributes.name }}</h3>
                </div>
            </router-link>
        </template>
    </div>
    <div v-if="limit" class="talents__seeMore">
        <router-link :to="{ name: 'Talents' }">
            <button>Ver todos</button>
        </router-link>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { getTalents } from "../util";
import { ITalent } from "../util/interfaces";

export default defineComponent({
    props: {
        limit: {
            type: Number,
            required: false
        },
    },
    data: () => ({
        talents: [] as Array<ITalent>,
        filters: {
            name: '',
            voices: '',
            locutionTypes: ''
        }
    }),
    async mounted() {
        try {
            this.talents = (await getTalents(true)).data as Array<ITalent>;

        } catch (error) {
            console.log('Error when trying to get talents', error);
        }

        this.setFilters();
        this.applyFilters();

    },
    methods: {
        getTalentImage(id: number) {
            const talent = this.talents.find((talent: ITalent) => talent.id === id);
            const talentFirstImage = talent?.attributes.images.data[0].attributes.formats.medium.url;
            return (import.meta.env.VITE_FRONT_URL || '') + (talentFirstImage || '');
        },
        setFilters() {
            this.filters = {
                name: this.$route.query.name?.toString() || '',
                voices: this.$route.query.voices?.toString() || '',
                locutionTypes: this.$route.query.locutionTypes?.toString() || '',
            };
        },
        applyFilters() {
            this.talents = this.talents.filter((talent: ITalent, index: number) => (
                index < (this.limit || 1000)
                && (this.filters.name ? this.normalizeString(talent.attributes.name) === this.normalizeString(this.filters.name) : true)
                && (this.filters.voices ? this.normalizeString(this.filters.voices).indexOf(this.normalizeString(talent.attributes.gender)) >= 0 : true)
                && (this.filters.locutionTypes ? talent.attributes.locution_types.data.some((lt) => this.normalizeString(this.filters.locutionTypes).indexOf(this.normalizeString(lt.attributes.type.toLowerCase())) >= 0) : true)
            ));
        },
        normalizeString(str: string): string {
            return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        }
    }
})

</script>

<style scoped>
.talents__list {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    padding: 50px;
    background-color: #2e456795;
}

.talents__seeMore {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #2e456795;
    padding-bottom: 50px;
}

.talents__seeMore button {
    background-color: var(--blue1);
    text-transform: uppercase;
    letter-spacing: 2px;
    border: none;
    font-size: 16px;
    padding: 15px 20px;
}

.talents__seeMore button:hover {
    background-color: var(--pink);
}

.talent__card {
    opacity: 0.5;
    transition: 0.3s ease-in-out;
}
.talent__card:hover {
    opacity: 1;
    cursor: pointer;
}

.talent__card:hover > h3 {
    background-color: black;
    color: var(--pink);
}
.talent__card img {
    height: 350px;
    width: 350px;
    object-fit: cover;
    object-position: top;
    margin: 0px;
}
.talent__card h3 {
    position: absolute;
    height: 25px;
    width: 350px;
    margin: -69px 0px 0px 0px;
    padding: 20px 0px;
    background-color: #00000075;
    color: white;
    text-align: center;
    text-transform: uppercase;
    font-weight: 900;
    letter-spacing: 5px;
    transition: 0.3s;
}
</style>
