<script setup>
import notification from './../components/notification.vue';
import navigation from './../components/navigation.vue';
import foot from './../components/foot.vue';
import loading from './../components/loading.vue';
import {useRoute} from "vue-router"

const route = useRoute()

const routesWithPageTitles = () => ["dashboard","settings"].indexOf(route.name.toLowerCase()) !== -1
</script>

<template>
  <div class="flex flex-col h-full min-h-screen w-full">
    <navigation></navigation>
    <main class="flex-1 m-0 p-8 w-full">
      <div class="m-2 flex flex-col max-w-xl mx-auto space-y-8">
        <!-- page title -->
        <div v-if="routesWithPageTitles" class="w-full inline-flex items-center justify-left ring-2 ring-primary-800 px-3 py-2 rounded-2xl bg-white">
          <slot name="icon"></slot>
          <h1 class="text-xl font-semibold ml-2">
            <slot name="title"></slot>
          </h1>
        </div>
        <!-- page title -->
        <notification></notification>
        <loading></loading>
        <slot name="page">
        </slot>
      </div>
    </main>
    <foot></foot>
  </div>
</template>