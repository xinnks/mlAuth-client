<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();
const route = useRoute();

let session = computed(() => store.getters.getSession)
let accountInfo = computed(() => store.getters.getUser)

/**
 * @description Logs user out
 * */
const logOut = async () => {
  let loggedOut = await store.dispatch('LOGOUT');
  if(loggedOut){
    await router.replace('/login');
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

let darkMode = computed(() => store.getters.getDarkMode)

/**
 * @description Toggles dark mode
 * */
const toggleDarkMode = () => {
  store.dispatch('TOGGLE_DARK_MODE')
}
</script>

<template>
  <nav class="flex items-center justify-between flex-wrap bg-primary-300 p-2 px-3">
    <div class="flex space-x-4">
      <router-link :to="session ? '/dashboard' : '/'" title="mlAuth">
        <img alt="mlAuth logo" class="w-12 self-center border-2 border-gray-600 rounded-lg" src="./../assets/mlAuth.svg" />
      </router-link>
      <div class="inline-flex justify-between align-middle items-center flex-shrink-0 text-black mr-6">
        <router-link v-if="session" to="/dashboard" title="Dashboard Page" class="inline-flex items-center lg:space-x-2 text-sm p-2 leading-none border-2 rounded-full border-black hover:border-transparent hover:text-primary hover:bg-black lg:mt-0" :class="route.path === '/dashboard' ? 'bg-black text-primary': 'text-black'">
          <span class="lg:">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-current w-5 h-5"><path fill="none" d="M0 0h24v24H0z"/><path d="M6.5 11.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm.5 10a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm10-10a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0 10a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zM6.5 9.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm.5 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm10-10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm0 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/></svg>
          </span>
          <span class="ml-2 hidden lg:block">Dashboard</span>
        </router-link>
      </div>
    </div>

    <div class="flex justify-center space-x-4" v-if="session">
      <div class="flex flex-col space-y-3 p-2 px-0 font-bold hidden lg:block" v-if="accountInfo">
        <div class="flex space-x-4">
          <span :title="`${accountInfo.firstName} ${accountInfo.lastName}`">{{accountInfo.firstName}} {{accountInfo.lastName}}</span>
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
      <button @click="toggleDarkMode()" :title="darkMode ? 'Light Mode' : 'Dark Mode'" class="inline-flex items-center text-sm leading-none text-black hover:border-transparent lg:mt-0">
        <svg v-if="darkMode" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  class="fill-current w-5 h-5"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"/></svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-current w-5 h-5"><path fill="none" d="M0 0h24v24H0z"/><path d="M10 7a7 7 0 0 0 12 4.9v.1c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2h.1A6.979 6.979 0 0 0 10 7zm-6 5a8 8 0 0 0 15.062 3.762A9 9 0 0 1 8.238 4.938 7.999 7.999 0 0 0 4 12z"/></svg>
      </button>
    </div>
  </nav>
</template>