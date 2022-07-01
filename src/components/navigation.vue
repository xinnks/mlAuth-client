<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();

let session = computed(() => store.getters.getSession)

const logOut = async () => {
  let loggedOut = await store.dispatch('LOGOUT');
  if(loggedOut){
    router.replace('/login');
  }
}

// automatic logging out on session state changes
watch(session, (oldVal, newVal) => {
  console.log({session}, {oldVal, newVal})
  // if(!newVal){
  //   console.log("Logging Out!!")
  //   store.dispatch('LOGOUT');
  //   router.replace('/login')
  // }
})
</script>

<template>
  <nav class="flex items-center justify-between flex-wrap bg-primary-300 p-6">
    <div class="inline-flex flex-col items-center flex-shrink-0 text-bacl mr-6">
      <span class="font-semibold text-2xl">mlAuth</span>
    </div>
    <div class="flex flex-col justify-center" v-if="session">
      <button @click="logOut()" href="#" class="inline-block text-sm px-4 py-2 leading-none border-2 rounded-full text-black border-black hover:border-transparent hover:text-primary hover:bg-black lg:mt-0">Log Out</button>
    </div>
  </nav>
</template>