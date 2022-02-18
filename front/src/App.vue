<script setup lang="ts">
import Menu from './components/Menu.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <Menu></Menu>
  <router-view v-cloak />
  <Footer></Footer>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");

:root {
  --blue1: #101928;
  --blue2: #2e4567;
  --pink: #7c5579;
}

body {
  margin: 0px;
  padding: 0px;
  font-family: "Roboto", sans-serif;
}

input {
  border: none;
  padding: 5px;
}

button {
  background-color: var(--blue2);
  border: none;
  color: white;
  font-weight: bolder;
  border-radius: 5px;
  transition: 0.3s ease-in-out;
}

button:hover {
  cursor: pointer;
  background-color: var(--pink);
  transform: translateX(3px);
}

[v-cloak] {
  display: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
