<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

let loading = computed(() => store.getters.getLoading);
</script>

<template>
  <div v-if="loading">
    <div v-show="loading.show" class="flex space-x-4 items-center bg-slate-100 border border-slate-400 text-slate-700 px-4 py-1 text-xl font-semibold rounded relative" role="alert">
      <span>
        <svg class="animate-spin fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M18.364 5.636L16.95 7.05A7 7 0 1 0 19 12h2a9 9 0 1 1-2.636-6.364z"/></svg>
      </span>
      <span class="block sm:inline">{{ loading.message }}</span>
    </div>
  </div>
</template>