<script setup>
import { computed, onMounted, ref, watch, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import page from './../layouts/page.vue'

const store = useStore();
const route = useRoute();

let showKeysForm = ref(false);
let hasKeys = ref(false);
let hideSecret = ref(true);

let accountInfo = computed(() => store.getters.getUser)

watch(accountInfo, (val) => {
  if(val){
    hasKeys = !!val.client
  }
}, {immediate: true})

let newKey = reactive({
  title: "Login",
  fields: {
    callbackUrl: {
      label: "Callback Url",
      type: "text",
      value: "",
      error: false
    },
    lifespan: {
      label: "Life Span",
      type: "number",
      value: "",
      error: false
    }
  },
  actionLabel: "Login"
})
let { callbackUrl, lifespan } = newKey.fields

const prepareRegeneration = () => {
  callbackUrl.value = accountInfo.value.callbackUrl
  lifespan.value = accountInfo.value.lifespan
  showKeysForm.value = true
}

const hide = (val) => val ? val.split('').map(i => "*").join("") : ''

const generateKeys = () => {
  if(callbackUrl.value === "") return missing("Callback Url", callbackUrl)
  if(!/https?:\/\/[\d\w]+((\.\w{2,})|(:\d{4}))/gi.test(callbackUrl.value)) return missing("Callback Url", callbackUrl, false)

  let finalData = lifespan.value ? {
    life_span: lifespan.value,
    callback_url: callbackUrl.value} : 
    {callback_url: callbackUrl.value}

  store.dispatch('GENERATE_KEYS', finalData);
}

watch(route.path, () => {
  if(accountInfo.value.secret !== undefined){
    forgetSecret()
  }
})

const forgetSecret = () => {
  accountInfo.value.secret = ""
}

const missing = (field, val, syntax = true) => {
  store.commit(
    'notify',
    {message:`${field} ${syntax ? 'cannot be empty':'is not valid'}`, type: "error"}
  )
  val.error = true
}
</script>

<template>
  <page>
    <template #page>
    <em>{{accountInfo}}</em>
      <div class="flex flex-col space-y-3 p-2" v-if="accountInfo">
        <h1 class="text-xl font-semibold">Account Info</h1>
        <div class="flex space-x-4">
          Name: {{accountInfo.firstName}} {{accountInfo.lastName}}
        </div>
        <div class="flex space-x-4">
          Email: {{accountInfo.email}}
        </div>
      </div>

      <div class="mt-8">
        <div class="w-full inline-flex items-center justify-between ring-2 ring-primary-800 px-3 py-2 rounded-2xl bg-white">
          <h2 class="text-xl font-semibold">My Apps</h2>
        </div>
        
      </div>

      <div class="w-full inline-flex flex-col items-center justify-center ring-2 ring-gray-300 p-8 rounded-2xl" v-if="!hasKeys">
          <span class="text-center">
            Generate keys for your app to start authenticating users.
          </span>
          <div class="inline-flex justify-center pt-8">
            <button class="bg-gray-700 text-white ring-gray-300 hover:bg-yellow-300 hover:text-black font-bold rounded-full inline-flex items-center justify-center px-4 py-2 ring-0 hover:ring-black dark:ring-2" @click="showKeysForm = true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-current w-5 h-5 mr-2"><path fill="none" d="M0 0h24v24H0z"/><path d="M11 11V7h2v4h4v2h-4v4h-2v-4H7v-2h4zm1 11C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"/></svg>
              <span>Add Keys</span>
            </button>
          </div>
        </div>

      <div class="w-full inline-flex flex-col justify-center ring-2 ring-gray-300 p-8 rounded-2xl relative" v-if="hasKeys && accountInfo">
        <div class="flex py-1">
          <span class="font-semibold pr-4">App Name: </span> {{accountInfo.appName}}
        </div>
        <div class="flex py-1">
          <span class="font-semibold pr-4">Callback Url: </span> {{accountInfo.callbackUrl}}
        </div>
        <div class="flex py-1">
          <span class="font-semibold pr-4">Client Key: </span> 
          <span class="overflow-x-auto">{{accountInfo.client}}</span>
        </div>
        <div class="flex py-1">
          <span class="font-semibold pr-4">Client Secret: </span> 
          <code class="w-full relative">
          {{accountInfo.secret || "***********************"}}
          </code>
        </div>
        <div class="w-full flex justify-center mt-3 py-2">
          <button class="bg-gray-700 text-white ring-gray-300 hover:bg-yellow-300 hover:text-black font-bold rounded-full inline-flex items-center justify-center px-4 py-2 ring-0 hover:ring-black dark:ring-2" @click="prepareRegeneration()" v-show="!showKeysForm">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-current w-5 h-5 mr-2"><path fill="none" d="M0 0h24v24H0z"/><path d="M11 11V7h2v4h4v2h-4v4h-2v-4H7v-2h4zm1 11C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"/></svg>
              <span>Regenerate Keys</span>
            </button>
        </div>
      </div>

      <!-- Keys generating form -->
      <div class="w-full inline-flex flex-col p-6 ring-2 bg-white ring-gray-400 rounded-2xl mt-8 space-y-4" v-if="showKeysForm">
        <span class="inline-flex items-center">
          <label class="w-1/4 py-1 px-3">Callback Url: </label>
          <input type="text" v-model.number="callbackUrl.value" class="w-3/4 bg-blue-50 appearance-none border-2 border-blue-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500">
        </span>
        <span class="inline-flex items-center">
          <label class="w-1/4 py-1 px-3">Lifespan: </label>
          <input type="number" v-model.number="lifespan.value" class="w-3/4 bg-blue-50 appearance-none border-2 border-blue-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500">
        </span>
        <div class="inline-flex justify-center">
          <button @click.prevent="generateKeys()" class="bg-gray-700 text-white ring-gray-300 hover:bg-yellow-300 hover:text-black font-bold rounded-full inline-flex items-center justify-center px-4 py-2 ring-0 hover:ring-black dark:ring-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-current w-5 h-5 mr-2"><path fill="none" d="M0 0h24v24H0z"/><path d="M11 11V7h2v4h4v2h-4v4h-2v-4H7v-2h4zm1 11C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"/></svg>
            <span>{{ hasKeys ? 'Update' : 'Generate'}} Keys</span>
          </button>
        </div>
      </div>
    </template>
  </page>
</template>

<style>
</style>
