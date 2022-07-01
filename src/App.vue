<script setup>
import  { watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import  { useStore } from 'vuex';

const store = useStore();
const router = useRouter();
</script>

<template>
  <router-view/>
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
