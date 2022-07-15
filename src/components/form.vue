<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

defineProps({
  form: Object
})

defineEmits(['submitted'])

const store = useStore()
let loading = computed(() => store.getters.getLoading);
</script>

<template>
  <h1 class="self-center text-2xl font-semibold p-8">{{ form.title }}</h1>
  <div class="w-full sm:w-1/3 flex flex-col ring-2 ring-gray-200 bg-slate-50 shadow-sm shadow-slate-400 rounded-xl mx-auto min-w-fit">
    <form class="flex flex-col space-y-8 p-8">
      <div class="mt-4 flex justify-center items-center" v-for="field of form.fields">
        <label class="py-1 pr-3 font-semibold w-1/4" :for="field.label">{{field.label}}</label>
        <div class="w-3/4">
          <input :type="field.type" :id="field.label" v-model="field.value" class="appearance-none border-2 border-gray-300 rounded-xl w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-left" :class="{'border-red-300': field.error && field.value === ''}" required>
        </div>
      </div>
      <div class="inline-flex justify-center">
        <button class="bg-gray-700 text-white w-full ring-gray-300 hover:bg-yellow-300 hover:text-black font-bold rounded-full inline-flex items-center justify-center px-4 py-2 ring-0 hover:ring-black dark:ring-2" @click.prevent="$emit('submitted')">
        <span v-if="loading && loading.show">
          <svg class="animate-spin fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M18.364 5.636L16.95 7.05A7 7 0 1 0 19 12h2a9 9 0 1 1-2.636-6.364z"/></svg>
        </span>
        <span class="block sm:inline">
          {{form.actionLabel}}
        </span>
        </button>
      </div>
    </form>
  </div>
</template>