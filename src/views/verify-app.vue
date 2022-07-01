<script setup>
import pageVue from './../layouts/page.vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();
const route = useRoute();

let { token } = route.query;

const verify = async () => {
  if(!token) return missing("Problem with authentication link")

  const verified = await store.dispatch('VERIFY_APP', token);
  if(verified) router.replace('/login')
}

const missing = (message) => {
  store.commit(
    'notify',
    {message, type: "error"}
  )
  setTimeout(() => router.replace('/login'), 5000)
}

verify();
</script>

<template>
  <pageVue>
    Verifying User Account..
  </pageVue>
</template>
