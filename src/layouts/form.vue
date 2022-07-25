<script setup>
import notification from './../components/notification.vue';
</script>

<template>
  <div class="p-12 w-full min-h-[100vh] max-h-[100vh] flex flex-col justify-center dark:bg-gray-800 dark:text-white">
    <div class="flex justify-center items-center p-2">
      <router-link to="/">
        <img alt="mlAuth logo" class="w-20 self-center" src="./../assets/mlAuth.svg" />
      </router-link>
    </div>
    <div class="w-full flex justify-center">
      <notification></notification>
    </div>
    <slot name="form"></slot>
  </div>
</template>