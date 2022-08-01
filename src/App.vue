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
.gradient {
  background: linear-gradient(90deg, #2C3038 0%, #2c3038 100%);
}
.gradient-text{
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  background-image: linear-gradient(135deg,#f5d804 1.93%, #ff7927 48.09%, #f5d804 97.3%);
}
</style>
