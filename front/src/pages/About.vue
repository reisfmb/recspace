<template>
    <section v-if="page && page.attributes">
        <img :src="getPageImage()" alt="Rec Space" />
        <div>
            <h1>{{ title }}</h1>
            <p v-html="getPageText()"></p>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getPageAbout } from '../util';
import { IPageAbout } from "../util/interfaces";

export default defineComponent({
    data: () => ({
        title: 'Rec Space ?!',
        page: {} as IPageAbout
    }),
    async mounted() {
        this.page = (await getPageAbout()).data as IPageAbout;
    },
    methods: {
        getPageImage() {
            const pageImage = this.page.attributes.image;
            return (import.meta.env.VITE_FRONT_URL || '') + (pageImage.data.attributes.formats.medium.url || '');
        },
        getPageText() {
            return this.page.attributes.text.replaceAll('\n', '<br>');
        }
    }
})

</script>

<style scoped>
section {
    display: flex;
    padding: 100px;
}
section img {
    width: 350px;
    height: 400px;
    object-fit: cover;
    object-position: center;
}
section div {
    margin: 0px 50px;
    color: white;
}
section div h1 {
    font-size: 32px;
    text-transform: uppercase;
    text-align: center;
}
</style>
