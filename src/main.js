import { createApp } from 'vue'
import { router } from './router'
import { store } from './store'
import App from './App.vue'
import "./index.css"

const mlAuth = createApp(App)

router.beforeEach((to, from) => {
  if(!store.getters.getSession && to.meta.needsAuth){
    return {path: '/login'}
  }
  if(!to.meta.needsAuth && !!store.getters.getSession){
    return {path: '/dashboard'}
  }
})

mlAuth.use(store)
mlAuth.use(router)
mlAuth.mount('#app')