<script setup>
import  { watch, computed } from 'vue';
import  { useStore } from 'vuex';

const store = useStore();
let darkMode = computed(() => store.getters.getDarkMode)
</script>

<template>
  <div :class="darkMode ? 'dark':''">
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
</style>
