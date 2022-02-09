<template>
    <section>
        <div>
            <h1>{{ title }}</h1>
            <form method="POST">
                <input required name="name" type="text" placeholder="Nome" />
                <input required name="email" type="email" placeholder="E-mail" />
                <textarea required name="message"></textarea>
                <button>Enviar</button>
            </form>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    data: () => ({
        title: 'Contate-nos',
    }),
})

</script>

<style scoped>
section {
    display: flex;
    padding: 100px;
    align-items: center;
    justify-content: center;
}
section div {
    color: white;
}
section div h1 {
    font-size: 32px;
    text-transform: uppercase;
    text-align: center;
}
section div form {
    display: flex;
    flex-direction: column;
}
section div form input {
    height: 20px;
    padding: 10px;
    margin: 10px 0px;
}
section div form textarea {
    margin-top: 10px;
    width: 350px;
    height: 150px;
}
section div form button {
    background-color: var(--blue1);
    margin-top: 20px;
    padding: 10px;
    border: none;
    text-transform: uppercase;
}
</style>
