<template>
    <TalentDetails :id="id"></TalentDetails>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import TalentDetails from "../components/TalentDetails.vue";

export default defineComponent({
    components: { TalentDetails },
    props: {
        id: {
            type: Number,
            required: true
        }
    }
})

</script>

<style></style>
