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

let newApp = reactive({
  title: "New App",
  fields: {
    appName: {
      label: "App Name",
      type: "text",
      value: "",
      error: false
    },
    callbackUrl: {
      label: "Callback Url",
      type: "text",
      value: "",
      error: false
    },
    lifeSpan: {
      label: "Life Span",
      type: "number",
      value: 1800000,
      error: false
    },
    production: {
      label: "Environment",
      type: "checkbox",
      value: 0,
      error: false
    }
  },
  actionLabel: "Create"
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

const createApp = () => {
  if(appName.value === "")
    return missing("App Name", appName)
  if(callbackUrl.value === "")
    return missing("Callback Url", callbackUrl)
  if(!/https?:\/\/[\d\w]+((\.\w{2,})|(:\d{4}))/gi.test(callbackUrl.value))
    return missing("Callback Url", callbackUrl, false)

  let finalData = {
    name: appName.value,
    life_span: lifeSpan.value || 1800000,
    callback_url: callbackUrl.value,
    production: production === "checked"
  }

  store.dispatch('CREATE_APP', finalData);
}

/**
 * @description Generates new keys for an app and displays the newly created secret
 * @param {String} appId - App's id
 */
const generateKeys = async (appId) => {
  const newKeys = await store.dispatch('GENERATE_KEYS',{app_id: appId});
  if(newKeys)
    visibleSecrets.value[appId] = newKeys.secret
}

/**
 * @description Deletes an app
 */
const deleteApp = async (appId) => {
  await store.dispatch('DELETE_APP', appId)
}

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

        <!-- New App Form -->
        <div class="w-full inline-flex flex-col px-6 pb-6 pt-3 ring-2 bg-white ring-gray-400 rounded-2xl mt-8 space-y-4" v-if="showAppForm">
          <div class="inline-flex justify-center mb-4">
            <span class="font-bold">Create a new app</span>
          </div>
          <span class="inline-flex items-center">
            <label class="w-2/5 py-1 px-3">App Name: </label>
            <input type="text" v-model.number="appName.value" class="w-3/5 appearance-none border-2 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white" :class="{'bg-red-200 border-red-300 focus:border-red-300': appName.error && appName.value === '', 'bg-gray-100 border-gray-500 focus:border-gray-600': !(appName.error && appName.value === '')}">
          </span>
          <span class="inline-flex items-center">
            <label class="w-2/5 py-1 px-3">Callback Url: </label>
            <input type="text" v-model.number="callbackUrl.value" class="w-3/5 appearance-none border-2 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white" :class="{'bg-red-200 border-red-300 focus:border-red-300': callbackUrl.error && callbackUrl.value === '', 'bg-gray-100 border-gray-500 focus:border-gray-600': !(callbackUrl.error && callbackUrl.value === '')}">
          </span>
          <span class="inline-flex items-center">
            <label class="w-2/5 py-1 px-3">Magic Link Timeout: </label>
            <input type="number" @keydown="numbersOnly" v-model.number="lifeSpan.value" class="w-3/5 bg-gray-100 appearance-none border-2 border-gray-500 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
          </span>
          <span class="inline-flex items-center">
            <label class="w-2/5 py-1 px-3">App Environment: </label>
            <input type="checkbox" value="checked" v-model="production.value" class="appearance-none border-2 border-gray-500 rounded p-2 text-gray-700 leading-tight focus:outline-none focus:border-gray-500" :class="{'bg-blue-600':production.value}"> 
            <span class="px-2">{{ production.value ? "Production" : "Development" }}</span>
          </span>
          <div class="inline-flex justify-center space-x-4">
            <button @click.prevent="cancelNewApp()" class="bg-gray-300 text-gray-500 ring-gray-300 hover:bg-yellow-100 hover:text-black font-bold rounded-full inline-flex items-center justify-center px-4 py-2 ring-0 hover:ring-black dark:ring-2">
              <span>Cancel</span>
            </button>
            <button @click.prevent="createApp()" class="bg-gray-700 text-white ring-gray-300 hover:bg-yellow-300 hover:text-black font-bold rounded-full inline-flex items-center justify-center px-4 py-2 ring-0 hover:ring-black dark:ring-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-current w-5 h-5 mr-2"><path fill="none" d="M0 0h24v24H0z"/><path d="M11 11V7h2v4h4v2h-4v4h-2v-4H7v-2h4zm1 11C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"/></svg>
              <span>Create</span>
            </button>
          </div>
        </div>
        <!-- New App Form -->

        <div v-for="(app, key) in apps" :key="key" class="inline-flex w-full px-2 py-4" v-if="!showAppForm && apps">
          <div class="w-full inline-flex flex-col justify-center ring-2 ring-gray-300 px-6 pb-6 pt-2 rounded-2xl relative">
            <div class="flex pt-2 pb-3 mb-2 border-b-2 justify-between" :class="{'border-red-300': !app.production, 'border-green-300': app.production}">
              <span class="font-semibold">{{app.name}}</span>
              <button @click="hideApps[app.id] = !hideApps[app.id]">{{hideApps[app.id] ? "more info" : "hide"}}</button>
            </div>
            <div class="flex flex-col" :class="{'hidden' : hideApps[app.id]}">
              <div class="flex py-1">
                <span class="font-semibold pr-4">Callback Url: </span> {{app.callbackUrl}}
              </div>
              <div class="flex py-1">
                <span class="font-semibold pr-4">Magic Link Timeout: </span> {{ timeInMinutes(app.magicLinkTimeout) }}
              </div>
              <div class="flex py-1">
                <span class="font-semibold pr-4">Client: </span> 
                <span class="overflow-x-auto">{{app.client}}</span>
              </div>
              <div class="flex py-1">
                <span class="font-semibold pr-4">Secret: </span> 
                <code class="w-full relative">
                {{app.secret || "***********************"}}
                </code>
              </div>
              <div class="flex py-2 align-center">
                <button class="bg-gray-700 text-white ring-gray-300 hover:bg-yellow-300 hover:text-black font-bold rounded-full inline-flex items-center justify-center px-4 py-2 ring-0 hover:ring-black dark:ring-2" @click="generateKeys(app.id)">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-current w-5 h-5 mr-2"><path fill="none" d="M0 0h24v24H0z"/><path d="M10.758 11.828l7.849-7.849 1.414 1.414-1.414 1.415 2.474 2.474-1.414 1.415-2.475-2.475-1.414 1.414 2.121 2.121-1.414 1.415-2.121-2.122-2.192 2.192a5.002 5.002 0 0 1-7.708 6.294 5 5 0 0 1 6.294-7.708zm-.637 6.293A3 3 0 1 0 5.88 13.88a3 3 0 0 0 4.242 4.242z"/></svg>
                  <span>Change Keys</span>
                </button>
              </div>
            </div>
          </div>
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
