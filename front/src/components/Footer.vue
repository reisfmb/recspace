<template>
    <div class="footer">
        <p>Agência RecSpace | 2022</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";


export default defineComponent({
    data: () => ({})
})

</script>

<style scoped>
.footer {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100px;
    background-color: var(--blue1);
}
.footer p {
    color: white;
    text-align: center;
    font-size: small;
}
</style>
