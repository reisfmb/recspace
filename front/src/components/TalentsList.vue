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
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { getTalents } from "../util";
import { ITalent } from "../util/interfaces";

export default defineComponent({
    props: {
        limit: {
            type: Number,
            default: 8,
            required: false
        }
    },
    data: () => ({
        talents: [] as Array<ITalent>
    }),
    async mounted() {
        try {
            this.talents = (await getTalents(true)).data as Array<ITalent>;

            if (this.limit && this.limit > 0) {
                this.talents = this.talents.filter((_, index: number) => {
                    return index < this.limit;
                })
            }

        } catch (error) {
            console.log('Error when trying to get talents', error);
        }
    },
    methods: {
        getTalentImage(id: number) {
            const talent = this.talents.find((talent: ITalent) => talent.id === id);
            const talentFirstImage = talent?.attributes.images.data[0].attributes.formats.medium.url;
            return (import.meta.env.VITE_FRONT_URL || '') + (talentFirstImage || '');
        }
    }
})

</script>

<style scoped>
.talents__list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    padding: 50px;
    background-color: #2e456795;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
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
