import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import { router } from './router'
import { store } from './store'
import App from './App.vue'
import "./index.css"

const mlAuth = createApp(App)
const head = createHead()

router.beforeEach((to, from) => {
  if(!store.getters.getSession && to.meta.needsAuth){
    return {path: '/login'}
  }
  if(!to.meta.needsAuth && !!store.getters.getSession && to.path !== "/docs"){
    return {path: '/dashboard'}
  }
})

mlAuth.use(store)
mlAuth.use(router)
mlAuth.use(head)
mlAuth.mount('#app')