<template>
    <div class="multiselect">
        <input
            @click="showOptions = !showOptions"
            type="text"
            :placeholder="placeholder"
            readonly="true"
            :value="modelValue"
        />
        <div
            v-show="showOptions"
            class="multiselect__options"
            @focusout="handleFocusOut"
            tabindex="0"
        >
            <ul>
                <li
                    v-for="(option, index) in options"
                    @click="triggerOption(index)"
                    :class="selectedOptionsIndexes.indexOf(index) >= 0 ? 'multiselect__options__option--active' : ''"
                >{{ option }}</li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        placeholder: {
            type: String,
            required: true
        },
        options: {
            type: Object as () => Array<string>,
            required: true
        },
        modelValue: {
            type: String,
            required: true
        }
    },
    emits: ['update:modelValue'],
    data: () => ({
        showOptions: false,
        selectedOptionsIndexes: [] as Array<number>,
    }),
    methods: {
        triggerOption(index: number) {

            this.selectedOptionsIndexes.includes(index)
                ? this.selectedOptionsIndexes = this.selectedOptionsIndexes.filter((_) => _ != index)
                : this.selectedOptionsIndexes = [...this.selectedOptionsIndexes, index]

            this.$emit('update:modelValue', this.selectedOptionsString);
        },
        handleFocusOut() {
            this.showOptions = false;
        }
    },
    computed: {
        selectedOptionsString() {
            return this.options
                .filter((option, index) => this.selectedOptionsIndexes.indexOf(index) >= 0)
                .join('+');
        }
    }
})

</script>

<style scoped>
.multiselect {
    position: relative;
    display: inline-block;
    font-size: small;
}

.multiselect input {
    margin: 0px 10px;
    padding: 5px;
    border: none;
}
.multiselect__options {
    position: absolute;
    right: 0;
    left: 0;
    z-index: 1;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
.multiselect__options ul {
    background-color: white;
    margin: 0px;
    padding: 10px;
    list-style-type: none;
}
.multiselect__options ul li {
    color: #606060;
    margin: 5px 0px;
    transition: 0.3s;
}
.multiselect__options ul li:hover {
    cursor: pointer;
    color: var(--blue2);
}
.multiselect__options:before {
    content: "";
    width: 0px;
    height: 0px;
    border-style: solid;
    border-width: 0px 10px 10px 10px;
    border-color: transparent transparent white transparent;
    display: inline-block;
    margin-left: calc(50% - 10px);
    margin-bottom: -5px;
}
.multiselect__options__option--active {
    color: white !important;
    background-color: var(--blue2);
    padding: 5px;
}
</style>
