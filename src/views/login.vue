<script setup>
import { reactive } from 'vue';
import { useStore } from 'vuex';
import formLayout from './../layouts/form.vue';
import formComponent from '../components/form.vue';

const store = useStore();

let form = reactive({
  title: "Login",
  fields: {
    email: {
      label: "Email",
      type: "email",
      value: "",
      error: false
    }
  },
  actionLabel: "Login"
})

const login = async () => {
  let { email } = form.fields
  if(email.value === "") return missing("email", email)
  if(!/[\d\w]+@[\d\w]+\.{1}\w{2,}/gi.test(email.value)) return missing("email", email, false)

  let sent = await store.dispatch('LOGIN', email.value);
  if(sent)
    email.value = ""
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
  <formLayout>
    <template #form>
      
      <formComponent :form="form" @submitted="login()">
      </formComponent>

    </template>
  </formLayout>
</template>
