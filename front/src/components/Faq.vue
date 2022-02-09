<template>
    <div class="faq">
        <h3>Perguntas Frequentes</h3>
        <div v-for="(item, index) in data">
            <div class="faq__question" @click="handleQuestionClick(index)">{{ item.question }}</div>
            <div v-show="indexToShow === index" class="faq__answer">{{ item.answer }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        data: {
            type: Object as () => Array<{ question: string, answer: string }>,
            required: true
        }
    },
    data: () => ({
        indexToShow: -1
    }),
    methods: {
        handleQuestionClick(index: number) {
            this.indexToShow === index
                ? this.indexToShow = -1
                : this.indexToShow = index;
        }
    }
})

</script>

<style scoped>
.faq {
    color: white;
    min-width: 500px;
}
.faq h3 {
    font-size: 24px;
    text-transform: uppercase;
    text-align: center;
}
.faq .faq__question,
.faq .faq__answer {
    padding: 25px;
}
.faq__question {
    background-color: var(--blue1);
    text-transform: uppercase;
    font-weight: bolder;
    margin-bottom: 1px;
}
.faq__question:hover {
    cursor: pointer;
}
.faq__answer {
    background-color: var(--blue2);
    border: 3px solid var(--blue1);
    margin-top: -1px;
}
</style>
