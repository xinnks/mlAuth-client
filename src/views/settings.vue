<script setup>
import Page from "./../layouts/page.vue";
import { computed,reactive, watch } from "vue"
import { useStore } from "vuex"

const store = useStore()

const user = computed(()  => store.getters.getUser)
let userCopy = reactive({ 
  firstName: "",
  lastName: ""
})

watch(user, (data) => {
  const {firstName, lastName} = {...data}
  userCopy = {firstName, lastName}
}, {
  immediate: true
})

const applyChanges = async () => {
  let {firstName, lastName} = userCopy
  await store.dispatch('UPDATE_ACCOUNT', {
    first_name: firstName,
    last_name: lastName
  })
}

const deleteAccount = async () => {
  if(confirm("Are you sure you want to delete your account? This action can't be reversed."))
    await store.dispatch('DELETE_ACCOUNT')
}
</script>

<template>
  <page>
    <template #icon>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-current w-5 h-5"><path fill="none" d="M0 0h24v24H0z"/><title>Settings</title><path d="M2 12c0-.865.11-1.703.316-2.504A3 3 0 0 0 4.99 4.867a9.99 9.99 0 0 1 4.335-2.505 3 3 0 0 0 5.348 0 9.99 9.99 0 0 1 4.335 2.505 3 3 0 0 0 2.675 4.63c.206.8.316 1.638.316 2.503 0 .865-.11 1.703-.316 2.504a3 3 0 0 0-2.675 4.629 9.99 9.99 0 0 1-4.335 2.505 3 3 0 0 0-5.348 0 9.99 9.99 0 0 1-4.335-2.505 3 3 0 0 0-2.675-4.63C2.11 13.704 2 12.866 2 12zm4.804 3c.63 1.091.81 2.346.564 3.524.408.29.842.541 1.297.75A4.993 4.993 0 0 1 12 18c1.26 0 2.438.471 3.335 1.274.455-.209.889-.46 1.297-.75A4.993 4.993 0 0 1 17.196 15a4.993 4.993 0 0 1 2.77-2.25 8.126 8.126 0 0 0 0-1.5A4.993 4.993 0 0 1 17.195 9a4.993 4.993 0 0 1-.564-3.524 7.989 7.989 0 0 0-1.297-.75A4.993 4.993 0 0 1 12 6a4.993 4.993 0 0 1-3.335-1.274 7.99 7.99 0 0 0-1.297.75A4.993 4.993 0 0 1 6.804 9a4.993 4.993 0 0 1-2.77 2.25 8.126 8.126 0 0 0 0 1.5A4.993 4.993 0 0 1 6.805 15zM12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-2a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/></svg>
    </template>
    <template #title>Settings</template>
    <template #page>

      <h2 class="border-l-4 border-gray-300 pl-2 text-lg font-semibold">Personal Information</h2>
      <div class="w-full flex flex-col px-6 py-6 ring-2 bg-white ring-gray-400 rounded-2xl mt-16 space-y-4 relative dark:bg-gray-800">
          <div class="inline-flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-2 relative w-full p-0">
            <div class="inline-flex items-center lg:w-1/2 w-full relative">
              <input type="text" v-model.number="userCopy.firstName" placeholder="First Name" class="appearance-none border-2 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white">
            </div>
            <div class="inline-flex items-center lg:w-1/2 w-full relative">
              <input type="text" v-model.number="userCopy.lastName" placeholder="Last Name" class="appearance-none border-2 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white">
            </div>
          </div>
          <div class="inline-flex space-x-2 w-full p-0">
            <input type="text" v-model.number="user.email" class=" appearance-none border-2 rounded py-2 px-4 text-gray-700 leading-tight disabled:bg-gray-200 focus:outline-none focus:bg-white w-full lg:w-1/2" disabled>
          </div>
          <div class="inline-flex justify-center space-x-4">
            <button @click.prevent="applyChanges()" class="bg-gray-700 text-white ring-gray-300 hover:bg-yellow-300 hover:text-black font-bold rounded-full inline-flex items-center justify-center px-4 py-2 ring-0 hover:ring-black dark:ring-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-current w-5 h-5 mr-2"><path fill="none" d="M0 0h24v24H0z"/><path d="M7 19v-6h10v6h2V7.828L16.172 5H5v14h2zM4 3h13l4 4v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm5 12v4h6v-4H9z"/></svg>
              <span>Save</span>
            </button>
          </div>
        </div>

        <h2 class="border-l-4 border-red-300 pl-2 text-lg font-semibold">Danger</h2>
        <div class="w-full inline-flex flex-col px-6 py-6 ring-2 bg-white ring-gray-400 rounded-2xl mt-16 space-y-4 dark:bg-gray-800">
          <p>This is a not recoverable action that deletes your account information and all your created apps.</p>
          <div class="inline-flex justify-center space-x-4">
            <button @click.prevent="deleteAccount()" class="bg-white dark:bg-gray-700 border-2 border-red-500 dark:border-red-400 outline-red-500 text-red-500 dark:text-red-400 dark:hover:text-white dark:hover:bg-red-600 font-bold rounded-full inline-flex items-center justify-center px-4 py-2 ring-0 hover:ring-black">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-current w-5 h-5 mr-2"><path fill="none" d="M0 0h24v24H0z"/><path d="M14 14.252v2.09A6 6 0 0 0 6 22l-2-.001a8 8 0 0 1 10-7.748zM12 13c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm7 6.586l2.121-2.122 1.415 1.415L20.414 19l2.122 2.121-1.415 1.415L19 20.414l-2.121 2.122-1.415-1.415L17.586 19l-2.122-2.121 1.415-1.415L19 17.586z"/></svg>
              <span>DELETE ACCOUNT</span>
            </button>
          </div>
        </div>

    </template>
  </page>
</template>

<style scoped>

</style>