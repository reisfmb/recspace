<template>
    <section>
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>
        <iframe
            :src="googleFormsUrl"
            width="700"
            height="520"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
        >Carregando…</iframe>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    data: () => ({
        title: 'Agencie-se',
        description: 'Use a barra de rolagem para navegar pelo formulário',
        googleFormsUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeMdtYJgUxtc1eV-IgDTeTLyymgXU-hE2w-2H_jbz5M8F_nNg/viewform?embedded=true'
    }),
    methods: {}
});
</script>

<style scoped>
section {
    display: flex;
    flex-direction: column;
    padding: 100px;
    align-items: center;
    justify-content: center;
    color: white;
}
section h1 {
    font-size: 32px;
    text-transform: uppercase;
    text-align: center;
}
.freebirdFormviewerViewEmbedded {
    background-color: red;
}
</style>
