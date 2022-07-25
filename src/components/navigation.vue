<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();

let session = computed(() => store.getters.getSession)
let accountInfo = computed(() => store.getters.getUser)

const logOut = async () => {
  let loggedOut = await store.dispatch('LOGOUT');
  if(loggedOut){
    router.replace('/login');
  }
}

/**
 * @description Auto logout when session is nullified
 * */
watch(session, (val) => {
  if(!val){
    console.log("Logging out! [navigation] ", val)
    router.replace("/login")
  }
})
</script>

<template>
  <nav class="flex items-center justify-between flex-wrap bg-primary-300 p-6">
    <div class="inline-flex flex-col items-center flex-shrink-0 text-bacl mr-6">
      <span class="font-semibold text-2xl">mlAuth</span>
    </div>
    <div class="flex justify-center space-x-4" v-if="session">
      <div class="flex flex-col space-y-3 p-2 font-bold" v-if="accountInfo">
        <div class="flex space-x-4">
          {{accountInfo.firstName}} {{accountInfo.lastName}}
        </div>
      </div>
      <router-link to="/settings" title="Settings Page" class="inline-flex items-center text-sm p-2 leading-none border-2 rounded-full border-black hover:border-transparent hover:text-primary hover:bg-black lg:mt-0" :class="route.path === '/settings' ? 'bg-black text-primary': 'text-black'">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-current w-5 h-5"><path fill="none" d="M0 0h24v24H0z"/><title>Settings</title><path d="M2 12c0-.865.11-1.703.316-2.504A3 3 0 0 0 4.99 4.867a9.99 9.99 0 0 1 4.335-2.505 3 3 0 0 0 5.348 0 9.99 9.99 0 0 1 4.335 2.505 3 3 0 0 0 2.675 4.63c.206.8.316 1.638.316 2.503 0 .865-.11 1.703-.316 2.504a3 3 0 0 0-2.675 4.629 9.99 9.99 0 0 1-4.335 2.505 3 3 0 0 0-5.348 0 9.99 9.99 0 0 1-4.335-2.505 3 3 0 0 0-2.675-4.63C2.11 13.704 2 12.866 2 12zm4.804 3c.63 1.091.81 2.346.564 3.524.408.29.842.541 1.297.75A4.993 4.993 0 0 1 12 18c1.26 0 2.438.471 3.335 1.274.455-.209.889-.46 1.297-.75A4.993 4.993 0 0 1 17.196 15a4.993 4.993 0 0 1 2.77-2.25 8.126 8.126 0 0 0 0-1.5A4.993 4.993 0 0 1 17.195 9a4.993 4.993 0 0 1-.564-3.524 7.989 7.989 0 0 0-1.297-.75A4.993 4.993 0 0 1 12 6a4.993 4.993 0 0 1-3.335-1.274 7.99 7.99 0 0 0-1.297.75A4.993 4.993 0 0 1 6.804 9a4.993 4.993 0 0 1-2.77 2.25 8.126 8.126 0 0 0 0 1.5A4.993 4.993 0 0 1 6.805 15zM12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-2a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/></svg>
        <span class="ml-2 hidden lg:block">Settings</span>
      </router-link>
      <button @click="logOut()" title="Log Out" class="inline-flex items-center text-sm p-2 leading-none border-2 rounded-full text-black border-black hover:border-transparent hover:text-primary hover:bg-black lg:mt-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-current w-5 h-5"><path fill="none" d="M0 0h24v24H0z"/><title>Log Out</title><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2a9.985 9.985 0 0 1 8 4h-2.71a8 8 0 1 0 .001 12h2.71A9.985 9.985 0 0 1 12 22zm7-6v-3h-8v-2h8V8l5 4-5 4z"/></svg>
        <span class="ml-2 hidden lg:block">Log Out</span>
      </button>
    </div>
  </nav>
</template>