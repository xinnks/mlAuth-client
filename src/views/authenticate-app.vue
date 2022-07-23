<script setup>
import pageVue from './../layouts/page.vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();
const route = useRoute();

let { token } = route.query;

const authenticate = async () => {
  if(!token) return missing("Problem with authentication link")

  const login = await store.dispatch('AUTHENTICATE', token);
  if(login) router.replace('/dashboard')
  router.replace("/login")
}

const missing = (message) => {
  store.commit(
    'notify',
    {message, type: "error"}
  )
  setTimeout(() => router.replace('/login'), 5000)
}

authenticate();
</script>

<template>
  <pageVue>
    Logging in..
  </pageVue>
</template>
