<template>
    <div class="cast">
        <div class="cast__header">
            <h1>{{ title }}</h1>
            <p>{{ description }}</p>
        </div>

        <div class="cast__talents">
            <template v-for="talent in talents">
                <div class="cast__talents__talent">
                    <h4>{{ talent.attributes.name }}</h4>
                    <img
                        :src="getTalentImage(talent.id)"
                        :alt="`Rec Space: ${talent.attributes.name}`"
                    />
                    <input
                        type="checkbox"
                        :checked="isTalentSelected(talent.id)"
                        @click="toggleTalentSelection(talent.id)"
                    />
                </div>
            </template>
        </div>

        <div class="cast__footer">
            <input type="email" placeholder="Seu e-mail" />
            <button>Enviar</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { getTalents } from "../util";
import { ITalent } from "../util/interfaces";

export default defineComponent({
    data: () => ({
        title: 'Monte seu cast',
        description: 'Digite seu e-mail, selecione os talentos que tem interesse em contratar, e clique em enviar que entreremos em contato!',
        talents: [] as Array<ITalent>,
    }),
    async mounted() {
        try {
            this.talents = (await getTalents(true)).data as Array<ITalent>;

        } catch (error) {
            console.log('Error when trying to get talents', error);
        }
    },
    methods: {
        getTalentImage(id: number) {
            const talent = this.talents.find((talent: ITalent) => talent.id === id);
            const talentFirstImage = talent?.attributes.images.data[0].attributes.formats.medium.url;
            return (import.meta.env.VITE_FRONT_URL || '') + (talentFirstImage || '');
        },
        isTalentSelected(id: number) {
            const lsCast = localStorage.getItem('rec-space-cast');
            if (!lsCast) { return false; }
            return JSON.parse(lsCast).indexOf(id) >= 0;
        },
        toggleTalentSelection(id: number) {
            const lsCast = localStorage.getItem('rec-space-cast');
            if (!lsCast) {
                localStorage.setItem('rec-space-cast', JSON.stringify([id]));
            } else {
                const lsCastArray = JSON.parse(lsCast);
                if (lsCastArray.indexOf(id) >= 0) {
                    localStorage.setItem('rec-space-cast', JSON.stringify(lsCastArray.filter((tid: number) => tid !== id)));
                } else {
                    localStorage.setItem('rec-space-cast', JSON.stringify([...lsCastArray, id]));
                }
            }
        }
    }
});

</script>

<style scoped>
.cast {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 50px;
    padding: 50px;
    color: white;
    background-color: var(--blue1);
}
.cast__header,
.cast__footer {
    display: flex;
    flex-direction: column;
}
.cast h1 {
    font-size: 32px;
    text-transform: uppercase;
    text-align: center;
}
.cast hr {
    color: var(--blue2);
    width: 100%;
    margin-bottom: 25px;
}
.cast__talents {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
    padding: 50px 0px;
    border-top: 1px solid var(--blue2);
    border-bottom: 1px solid var(--blue2);
}
.cast__talents__talent {
    display: flex;
    flex-direction: column;
}
.cast__talents__talent h4 {
    margin-top: 0px;
    font-size: 18px;
    text-transform: uppercase;
    text-align: center;
}
.cast__talents__talent img {
    height: 125px;
    width: 125px;
    object-fit: cover;
    object-position: top;
    margin: 0px 20px;
}
.cast__talents__talent input[type="checkbox"] {
    margin: 25px 0px 50px 0px;
    height: 25px;
}

.cast__footer {
    margin-top: 25px;
}
.cast__foter input[type="email"] {
    height: 25px;
}
.cast__footer button {
    margin-top: 25px;
    height: 25px;
}
</style>