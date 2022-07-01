<script setup>
import notification from './../components/notification.vue';
import navigation from './../components/navigation.vue';
import foot from './../components/foot.vue';
import loading from './../components/loading.vue';
</script>

<template>
  <div class="flex flex-col h-full min-h-screen w-full">
    <navigation></navigation>
    <main class="flex-1 m-0 p-8 w-full">
      <div class="m-2 flex flex-col max-w-xl mx-auto space-y-8">
        <notification></notification>
        <loading></loading>
        <slot name="page"></slot>
      </div>
    </main>
    <foot></foot>
  </div>
</template>