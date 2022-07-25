<script setup>
import { computed, ref, watch, reactive, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import page from './../layouts/page.vue'

const store = useStore();
const route = useRoute();

let showAppForm = ref(false);
let showAppUpdateForm = ref(false);
let hideApps = ref({})
let visibleSecrets = ref({})
let accountInfo = computed(() => store.getters.getUser) // redundant
let apps = computed(() => store.getters.getApps)

/**
 * @description Create an array to store content hide states for apps in user's app list
 * */
watch(apps, (appsList) => {
    hideApps.value = {};
    if(appsList && appsList.length){
      appsList.forEach(app => {
        hideApps.value[app.id] = true
      })
    }
  }, {
  immediate: true
})

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
const tempForm = JSON.parse(JSON.stringify(newApp))

let {appName, callbackUrl, lifeSpan, production} = newApp.fields

// clear all visible secrets on component mount
onMounted(() => {
  visibleSecrets.value = {};
}, {immediate: true})

const prepareNewApp = () => {
  showAppForm.value = true
}

const cancelNewApp = () => {
  showAppForm.value = false
  newApp = tempForm
}

const generateKeys = () => {
  if(callbackUrl.value === "") return missing("Callback Url", callbackUrl)
  if(!/https?:\/\/[\d\w]+((\.\w{2,})|(:\d{4}))/gi.test(callbackUrl.value)) return missing("Callback Url", callbackUrl, false)

const createApp = () => {

/**
 * @description Submit a form for creating a new app
 */
const createApp = async () => {
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

  const addedApp =  await store.dispatch('CREATE_APP', finalData)
  if(addedApp) {
    visibleSecrets.value[addedApp.id] = addedApp.secret
    cancelNewApp()
  }
}

let appChanges = reactive({
  id: "",
  fields: {
    updateAppName: {
      value: "",
      error: false
    },
    updateCallbackUrl: {
      value: "",
      error: false
    },
    updateLifeSpan: {
      value: 1800000,
      error: false
    },
    updateProduction: {
      value: 0,
      error: false
    }
  }
})
const tempUpdateForm = JSON.parse(JSON.stringify(appChanges))
let {updateAppName, updateCallbackUrl, updateLifeSpan, updateProduction} = appChanges.fields

/**
 * @description Prepares UI for app update state
 * @param {Object} appToUpdate - Details of app being updated
 * */
const prepareAppUpdate = (appToUpdate) => {
  showAppUpdateForm.value = true
  appChanges.id = appToUpdate.id
  ;({name: updateAppName.value, callbackUrl: updateCallbackUrl.value, magicLinkTimeout: updateLifeSpan.value, production: updateProduction.value} = appToUpdate)
}

const cancelAppUpdate = () => {
  showAppUpdateForm.value = false
  newApp = tempUpdateForm
}

/**
 * @description Submit a form for updating app details
 */
const updateApp = async () => {
  if(appChanges.id === "")
    return;
  if(updateAppName.value === "")
    return missing("App Name", updateAppName)
  if(updateCallbackUrl.value === "")
    return missing("Callback Url", updateCallbackUrl)
  if(!/https?:\/\/[\d\w]+((\.\w{2,})|(:\d{4}))/gi.test(updateCallbackUrl.value))
    return missing("Callback Url", updateCallbackUrl, false)

  const appChangesData = {
    name: updateAppName.value,
    life_span: updateLifeSpan.value || 1800000,
    callback_url: updateCallbackUrl.value,
    production: updateProduction.value === "checked",
    app_id: appChanges.id
  }

  if(await store.dispatch('UPDATE_APP', appChangesData)){
    cancelAppUpdate()
  }
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
 * @param {Object} data - App data
 * @param {String} data.id - App id
 * @param {String} data.name - App name
 */
const deleteApp = async ({id, name}) => {
  if(confirm(`Delete ${name}?`)) await store.dispatch('DELETE_APP', id)
}

/**
 * @description Copies passed text to clipboard
 * @param {String} text
 * */
const copyToClipboard = async(text) => {
  navigator.clipboard.writeText(text).then(() => {
    store.commit("notify", {
      message: "Copied to clipboard",
      type: "success"
    })
  })
}

const missing = (field, val, syntax = true) => {
/**
 * @description Notifies on form errors
 * @param {String} field - Name of form field
 * @param {Object} val - Object value being examined
 * @param {Bool} format - Whether this is a variable content format issue or not
 * */
const missing = (field, val, format = true) => {
  store.commit(
    'notify',
    {message:`${field} ${format ? 'cannot be empty':'is not valid'}`, type: "error"}
  )
  val.error = true
}
</script>

<template>
  <page>
    <template #icon>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-current w-5 h-5"><path fill="none" d="M0 0h24v24H0z"/><path d="M6.5 11.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm.5 10a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm10-10a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0 10a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zM6.5 9.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm.5 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm10-10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm0 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/></svg>
    </template>
    <template #title>My Apps</template>
    <template #page>

      <div>
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

        <!-- App Update Form -->
        <div class="w-full inline-flex flex-col px-6 pb-6 pt-3 ring-2 bg-white ring-gray-400 rounded-2xl mt-8 space-y-4" v-if="showAppUpdateForm">
          <div class="inline-flex justify-center mb-4">
            <span class="font-bold">Update app</span>
          </div>
          <span class="inline-flex items-center">
            <label class="w-2/5 py-1 px-3">App Name: </label>
            <input type="text" v-model.number="updateAppName.value" class="w-3/5 appearance-none border-2 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white" :class="{'bg-red-200 border-red-300 focus:border-red-300': updateAppName.error && updateAppName.value === '', 'bg-gray-100 border-gray-500 focus:border-gray-600': !(updateAppName.error && updateAppName.value === '')}">
          </span>
          <span class="inline-flex items-center">
            <label class="w-2/5 py-1 px-3">Callback Url: </label>
            <input type="text" v-model.number="updateCallbackUrl.value" class="w-3/5 appearance-none border-2 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white" :class="{'bg-red-200 border-red-300 focus:border-red-300': updateCallbackUrl.error && updateCallbackUrl.value === '', 'bg-gray-100 border-gray-500 focus:border-gray-600': !(updateCallbackUrl.error && updateCallbackUrl.value === '')}">
          </span>
          <span class="inline-flex items-center">
            <label class="w-2/5 py-1 px-3">Magic Link Timeout: </label>
            <input type="number" @keydown="numbersOnly" v-model.number="updateLifeSpan.value" class="w-3/5 bg-gray-100 appearance-none border-2 border-gray-500 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
          </span>
          <span class="inline-flex items-center">
            <label class="w-2/5 py-1 px-3">App Environment: </label>
            <input type="checkbox" value="checked" v-model="updateProduction.value" class="appearance-none border-2 border-gray-500 rounded p-2 text-gray-700 leading-tight focus:outline-none focus:border-gray-500" :class="{'bg-blue-600':updateProduction.value}">
            <span class="px-2">{{ updateProduction.value ? "Production" : "Development" }}</span>
          </span>
          <div class="inline-flex justify-center space-x-4">
            <button @click.prevent="cancelAppUpdate()" class="bg-gray-300 text-gray-500 ring-gray-300 hover:bg-yellow-100 hover:text-black font-bold rounded-full inline-flex items-center justify-center px-4 py-2 ring-0 hover:ring-black dark:ring-2">
              <span>Cancel</span>
            </button>
            <button @click.prevent="updateApp()" class="bg-gray-700 text-white ring-gray-300 hover:bg-yellow-300 hover:text-black font-bold rounded-full inline-flex items-center justify-center px-4 py-2 ring-0 hover:ring-black dark:ring-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-current w-5 h-5 mr-2"><path fill="none" d="M0 0h24v24H0z"/><path d="M11 11V7h2v4h4v2h-4v4h-2v-4H7v-2h4zm1 11C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"/></svg>
              <span>Update</span>
            </button>
          </div>
        </div>
        <!-- App Update Form -->

        <div v-for="(app, key) in apps" :key="key" class="inline-flex w-full px-2 py-4" v-if="!showAppForm && apps">
          <div class="w-full inline-flex flex-col justify-center ring-2 ring-gray-300 px-6 pb-6 pt-2 rounded-2xl relative">
            <div class="flex pt-2 pb-3 mb-2 border-b-2 justify-between" :class="{'border-red-300': !app.production, 'border-green-300': app.production}">
              <span class="font-semibold">{{app.name}}</span>
              <div class="inline-flex space-x-2">
                <button :title="hideApps[app.id] ? 'Show app details' : 'Hide app details'" @click="hideApps[app.id] = !hideApps[app.id]" class="text-gray-700 bg-primary-400 hover:bg-primary-500 p-1 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-current w-5 h-5" v-if="hideApps[app.id]"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"/></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-current w-5 h-5" v-else><path fill="none" d="M0 0h24v24H0z"/><path d="M12 10.828l-4.95 4.95-1.414-1.414L12 8l6.364 6.364-1.414 1.414z"/></svg>
                </button>
                <button title="Edit app details" @click="prepareAppUpdate(app)" class="text-white bg-gray-700 hover:bg-gray-800 p-1 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-current w-5 h-5"><path fill="none" d="M0 0h24v24H0z"/><path d="M6.414 16L16.556 5.858l-1.414-1.414L5 14.586V16h1.414zm.829 2H3v-4.243L14.435 2.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 18zM3 20h18v2H3v-2z"/></svg>
                </button>
                <button title="Delete app" @click="deleteApp(app)" class="text-white bg-red-500 hover:bg-red-600 p-1 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-current w-5 h-5"><path fill="none" d="M0 0h24v24H0z"/><path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-4.586 6l1.768 1.768-1.414 1.414L12 15.414l-1.768 1.768-1.414-1.414L10.586 14l-1.768-1.768 1.414-1.414L12 12.586l1.768-1.768 1.414 1.414L13.414 14zM9 4v2h6V4H9z"/></svg>
                </button>
              </div>
            </div>
            <div class="flex flex-col" :class="{'hidden' : hideApps[app.id]}">
              <div class="flex py-1">
                <span class="font-semibold pr-4">Callback Url: </span> {{app.callbackUrl}}
              </div>
              <div class="flex py-1">
                <span class="font-semibold pr-4">Magic Link Timeout: </span> {{ timeInMinutes(app.magicLinkTimeout) }}
              </div>
              <div class="flex py-1 relative space-x-2">
                <span class="font-semibold pr-4">Client: </span> 
                <span class="overflow-x-auto flex-1">
                  {{app.client}}
                </span>
                <button title="Copy client key" class="bg-gray-700 text-white text-sm ring-gray-300 hover:bg-gray-900 hover:text-white rounded-full inline-flex items-center justify-center px-2 ring-0 hover:ring-black dark:ring-2" @click="copyToClipboard(app.client)">
                  Copy
                </button>
              </div>
              <div class="flex py-1 relative space-x-2">
                <span class="font-semibold pr-4">Secret: </span> 
                <span class="overflow-x-auto flex-1">
                {{app.secret || visibleSecrets[app.id] || "***********************"}}
                </span>
                <button title="Copy secret key" v-if="visibleSecrets[app.id]" class="bg-gray-700 text-white text-sm ring-gray-300 hover:bg-gray-900 hover:text-white rounded-full inline-flex items-center justify-center px-2 ring-0 hover:ring-black dark:ring-2" @click="copyToClipboard(visibleSecrets[app.id])">
                  Copy
                </button>
              </div>
              <div class="flex py-2 align-center">
                <button title="Change app keys" class="bg-gray-700 text-white ring-gray-300 hover:bg-yellow-300 hover:text-black font-bold rounded-full inline-flex items-center justify-center px-4 py-2 ring-0 hover:ring-black dark:ring-2" @click="generateKeys(app.id)">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-current w-5 h-5 mr-2"><path fill="none" d="M0 0h24v24H0z"/><path d="M10.758 11.828l7.849-7.849 1.414 1.414-1.414 1.415 2.474 2.474-1.414 1.415-2.475-2.475-1.414 1.414 2.121 2.121-1.414 1.415-2.121-2.122-2.192 2.192a5.002 5.002 0 0 1-7.708 6.294 5 5 0 0 1 6.294-7.708zm-.637 6.293A3 3 0 1 0 5.88 13.88a3 3 0 0 0 4.242 4.242z"/></svg>
                  <span>Change Keys</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
      </div>

      <div class="w-full flex justify-center mt-3 py-2">
        <button title="Add new app" class="bg-gray-700 text-white ring-gray-300 hover:bg-yellow-300 hover:text-black font-bold rounded-full inline-flex items-center justify-center px-4 py-2 ring-0 hover:ring-black dark:ring-2" @click="prepareNewApp()" v-show="!showAppForm">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-current w-5 h-5 mr-2"><path fill="none" d="M0 0h24v24H0z"/><path d="M11 11V7h2v4h4v2h-4v4h-2v-4H7v-2h4zm1 11C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"/></svg>
          <span>New App</span>
        </button>
      </div>
    </template>
  </page>
</template>

<style scoped>
input[type="checkbox"]::checked{
  background: blue;
}
</style>
