<template>
    <div v-if="talent && talent.attributes" class="talent__details">
        <div class="talent__images">
            <span class="talent__images__nav" @click="prevImage">
                <i class="fas fa-caret-left"></i>
            </span>

            <img
                v-for="(image, idx) in getTalentImages()"
                v-show="idx === slider.index"
                :src="image"
                :alt="'RecSpace ' + talent.attributes.name"
            />

            <span class="talent__images__nav" @click="nextImage">
                <i class="fas fa-caret-right"></i>
            </span>
        </div>
        <div class="talent__description">
            <h3>{{ getFullName() }}</h3>

            <p>
                <label>Gênero:</label>
                <span class="badge">{{ talent.attributes.gender }}</span>
            </p>

            <p>
                <label>Locuções:</label>
                <span class="badge" v-for="(type, idx) in getLocutionTypes()">{{ type }}</span>
            </p>

            <p>{{ talent.attributes.description }}</p>

            <div class="talent__audios">
                <div v-for="audio in getAudios()">
                    <span>{{ audio.caption }}</span>
                    <audio controls>
                        <source :src="audio.url" :type="audio.mime" />
                    </audio>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { getTalent } from "../util";
import { ITalent, IImage, ILocutionType, IAudio } from "../util/interfaces";

export default defineComponent({
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    data: () => ({
        talent: {} as ITalent,
        slider: {
            index: 0,
            max: 0
        }
    }),
    async mounted() {
        try {
            const talentData = (await getTalent(this.id, true)).data
            this.talent = talentData;
            console.log(talentData);
        } catch (error) {
            console.log(`Error when trying to get talent of id ${this.id}`, error);
        }
    },
    methods: {
        getFullName() {
            return this.talent.attributes.name + ' ' + (this.talent.attributes.surname || '');
        },
        getTalentImages() {
            if (Object.keys(this.talent).length > 0) {
                this.slider.max = this.talent.attributes.images.data.length - 1;

                return this.talent.attributes.images.data
                    .map((image: IImage) => {
                        return (import.meta.env.VITE_FRONT_URL || '') + image.attributes.formats.medium.url;
                    });
            }

            return [];
        },
        getLocutionTypes() {
            return this.talent.attributes.locution_types.data
                .map((locutionType: ILocutionType) => locutionType.attributes.type);
        },
        getAudios() {
            return this.talent.attributes.audios.data
                .map((audio: IAudio) => ({
                    caption: audio.attributes.caption,
                    url: (import.meta.env.VITE_FRONT_URL || '') + audio.attributes.url,
                    mime: audio.attributes.mime
                }));
        },

        //

        nextImage() {
            this.slider.index = (this.slider.index + 1) % (this.slider.max + 1);
        },

        prevImage() {
            this.slider.index = this.slider.index - 1 < 0
                ? this.slider.max
                : this.slider.index - 1;
        }
    }
})

</script>

<style scoped>
.badge {
    display: inline-block;
    background-color: var(--blue2);
    padding: 5px;
    border-radius: 10px;
    margin: 5px;
    text-transform: capitalize;
}
.talent__details {
    color: white;
    display: flex;
    padding: 100px;
    margin: 50px;
    background-color: var(--blue1);
}

.talent__images {
    display: flex;
    align-items: center;
    justify-content: center;
}

.talent__images img {
    height: 500px;
    width: 300px;
    object-fit: cover;
}

.talent__images__nav {
    color: white;
    font-size: 25px;
    transition: 0.3s;
}
.talent__images__nav:hover {
    cursor: pointer;
    color: var(--pink);
}
.talent__images__nav:first-child {
    margin-right: 15px;
}
.talent__images__nav:last-child {
    margin-left: 15px;
}

.talent__description {
    margin-top: -25px;
    padding: 0px 25px;
}
.talent__description h3 {
    text-align: center;
    text-transform: uppercase;
    font-size: 24px;
}
.talent__description h3:after {
    content: "";
    display: block;
    margin: 10px auto;
    width: 150px;
    height: 2px;
    background-color: var(--pink);
}

.talent__description p {
    margin: 30px 0px;
}

.talent__description label {
    font-weight: bolder;
}

.talent__audios {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    margin-top: 50px;
    align-items: center;
    justify-content: center;
}
.talent__audios div {
    display: flex;
    flex-direction: column;
}
.talent__audios audio {
    margin: 5px 5px 25px 5px;
}
</style>
