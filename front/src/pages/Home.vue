<template>
    <TalentsList :limit="2" />
    <section>
        <Faq />
        <div>
            <p>bla bla bla</p>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import TalentsList from "../components/TalentsList.vue";
import Faq from "../components/Faq.vue";

export default defineComponent({
    components: { TalentsList, Faq }
})

</script>

<style scoped>
section {
    margin: 50px;
    display: flex;
    justify-content: space-around;
}
</style>
