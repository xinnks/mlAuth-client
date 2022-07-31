<script setup>
import publicNavigation from './../components/publicNavigation.vue';
import publicFoot from './../components/publicFoot.vue';
import {useRoute} from "vue-router"

const route = useRoute()

const routesWithPageTitles = () => ["dashboard","settings"].indexOf(route.name.toLowerCase()) !== -1
</script>

<template>
  <div class="gradient relative">
    <public-navigation></public-navigation>
    <slot></slot>
    <public-foot></public-foot>
  </div>
</template>

<style scoped>
body{
  font-family: 'Source Sans Pro', sans-serif;
}
</style>