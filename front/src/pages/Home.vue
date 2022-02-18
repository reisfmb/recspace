<template>
    <TalentsList :limit="3" />
    <section v-if="page && page.attributes">
        <Faq :data="getFaqData()" />
        <div>
            <h3>{{ title }}</h3>
            <p v-html="getHomeText()"></p>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { getPageHome } from "../util";
import { IPageHome } from "../util/interfaces";

import TalentsList from "../components/TalentsList.vue";
import Faq from "../components/Faq.vue";

export default defineComponent({
    components: { TalentsList, Faq },
    data: () => ({
        page: {} as IPageHome,
        title: 'Agencie-se',
    }),
    async mounted() {
        this.page = (await getPageHome()).data as IPageHome;
    },
    methods: {
        getFaqData() {
            return this.page.attributes.faq || [];
        },
        getHomeText() {
            return this.page.attributes.text.replaceAll('\n', '<br>') || '';
        }
    }
})

</script>

<style scoped>
section {
    margin: 50px;
    display: flex;
    justify-content: space-around;
}
section div {
    max-width: 500px;
    color: white;
}
section div h3 {
    font-size: 24px;
    text-transform: uppercase;
    text-align: center;
}
section div p {
    text-align: center;
}
</style>
