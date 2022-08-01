<script setup>
import { reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { Head } from '@vueuse/head'
import formLayout from './../layouts/form.vue';
import formComponent from '../components/form.vue';

const store = useStore();
const router = useRouter();

let form = reactive({
  title: "Register",
  fields: {
    firstName: {
      label: "First Name",
      type: "text",
      value: "",
      error: false
    },
    lastName: {
      label: "Last Name",
      type: "text",
      value: "",
      error: false
    },
    email: {
      label: "Email",
      type: "email",
      value: "",
      error: false
    },
  },
  actionLabel: "Register"
})

const register = async () => {
  let { email, firstName, lastName } = form.fields
  if(firstName.value === "") return missing("First Name", firstName)
  if(lastName.value === "") return missing("Last Name", lastName)
  if(form.fields.email.value === "") return missing("Email", email)
  if(!/[\d\w]+@[\d\w]+\.{1}\w{2,}/gi.test(email.value)) return missing("email", email, false)

  let createAccount = await store.dispatch('CREATE_ACCOUNT', {
    email: email.value,
    first_name: firstName.value,
    last_name: lastName.value,
  });

  if(createAccount){
    email.value = ""
    firstName.value = ""
    lastName.value = ""

    setTimeout(() => router.replace('/login'), 5000)
  }
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
  <Head>
    <title>Registration - mlAuth</title>
    <meta name="description" content="User registration page">
  </Head>
  <formLayout>
    <template #form>
      
      <formComponent :form="form" @submitted="register()">
      </formComponent>

    </template>
  </formLayout>
</template>
