<script setup>
import { computed, watch, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

let noty = computed(() => store.getters.getNotification);

const notyClasses = {
  error: 'bg-red-100 border border-red-400 text-red-700',
  success: 'bg-green-100 border border-green-400 text-green-700',
  info: 'bg-blue-100 border border-blue-400 text-blue-700',
  warning: 'bg-yellow-100 border border-yellow-400 text-yellow-700'
}

watch(noty, (val) => {
  if(val) {
    setTimeout(() => {
      store.dispatch('CLEAR_NOTIFICATION');
    }, val.timeout);
  }
}, {
  immediate: true
})
</script>

<template>
  <div v-if="noty">
    <div v-show="noty.show" :class="`border ${notyClasses[noty.type]} px-4 py-3 rounded relative`" role="alert">
      <span class="block sm:inline">{{ noty.message }}</span>
      <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
      </span>
    </div>
  </div>
</template>