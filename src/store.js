import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";
import { api } from "./api";
import { Vars } from "./config";
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

const processError = (error, {dispatch}) => {
  let message = "Unknown Error"
  if(error instanceof FetchError){
    message = error.data ? error.data.message : message
    if(error.response.status === (401 || 403)){
      dispatch("LOGOUT")
    }
  }
  return message
}
  
const account = {
  state: {
    user: null,
    session: null,
    apps: null
  },
  getters: {
    getUser: state => state.user,
    getSession: state => state.session,
    getApps: state => state.apps
  },
  mutations: {
    updateUser(state, payload){
      state.user = payload
    },
    updateSession(state, payload){
      state.session = payload
    },
    updateApps(state, payload){
      state.apps = payload
    updateApp(state, app){
      const appIndex = state.apps.findIndex(item => item.id === app.id)
      state.apps[appIndex] = app
    },
    }
  },
  actions: {
    CREATE_ACCOUNT: async ({ commit }, data) => {
      dispatch("START_LOADING", "Creating Account..")
      try {
        await api.createAccount(data)
        dispatch("STOP_LOADING")
        commit("notify", {
          message: 'Open the link we\'ve sent to your email to verify account',
          type: "success",
        });
      } catch (error) {
        dispatch("STOP_LOADING")
        commit("notify", {
          show: true,
          message: error.message,
          type: "error",
        });
      }
    },
    VERIFY_APP: async ({ commit, dispatch }, token) => {
      dispatch("START_LOADING", "Verifying Account..")
      try {
        await api.verifyAccount(token);
        dispatch("STOP_LOADING")
        commit("notify", {
          message: "Account Verified. Proceed to logging in.",
          type: "success",
        });
        return true;
      } catch (error) {
        dispatch("STOP_LOADING")
        commit("notify", {
          message: "Failed to verify account. Please reload the page.",
          type: "error",
        });
        return false;
      }
    },
    LOGIN: async ({ commit, dispatch }, email) => {
      dispatch("START_LOADING", "Sending magic link..")
      try{
        await api.createLoginRequest(email)
        dispatch("STOP_LOADING")
        commit('notify', {
          show: true,
          type: 'success',
          message: 'Open the link in your email to login.',
          timeout: 10000
        })
        return true
      } catch(error){
        dispatch("STOP_LOADING")
        console.log(error)
        commit('notify', {type: 'error', message: 'Failed to login', timeout: 10000})
        return false
      }
    },
    AUTHENTICATE: async ({ commit, dispatch }, token) => {
      dispatch("START_LOADING", "Authenticating..")
      try{
        let response = await api.createAuthSession(token);
        let {magicLink, session, account} = response
        commit('updateSession', session);
        commit('updateUser', account);
        commit('notify', {
          type: 'success',
          message: 'Logged in',
          timeout: 10000
        })
        dispatch("STOP_LOADING")
        return true
      } catch(error){
        console.log(error)
        dispatch("STOP_LOADING")
        commit('notify', {
          type: 'error',
          message: 'Failed to login',
          timeout: 10000
        })
        return false
      }
    },
    CREATE_APP: async ({ commit, state, dispatch }, data) => {
      dispatch("START_LOADING", "Creating app..")
      try {
        const response = await api.createApp({
          data,
          sessionToken: state.session.token
        });
        dispatch("STOP_LOADING")
        console.log({response})
        let { app } = response
        let tempApp = Object.assign({},app)
        delete app.secret
        commit('updateApps', state.apps ? state.apps.push(app) : app);
        return tempApp
      } catch (error) {
        dispatch("STOP_LOADING")
        let errorMessage = "Unknown error";
        if(error instanceof FetchError){
          errorMessage = error.data ? error.data.message : "App already exists"
        }
        commit("notify", {
          message: errorMessage,
          type: "error",
        });
        return false
      }
    },
    UPDATE_APP: async ({ commit, state, dispatch }, data) => {
      dispatch("START_LOADING", "Updating app..")
      try {
        const response = await api.updateApp({
          data,
          sessionToken: state.session.token
        });
        dispatch("STOP_LOADING")
        let { app } = response
        delete app.secret
        commit('updateApp', app);
        commit("notify", {
          message: "Updated app",
          type: "success",
        });
        return true
      } catch (error) {
        dispatch("STOP_LOADING")
        let errorMessage = processError(error, {dispatch})
        commit("notify", {
          message: errorMessage || "Unknown Error",
          type: "error",
        });
        return null
      }
    },
    GENERATE_KEYS: async ({ commit, state, dispatch }, data) => {
      dispatch("START_LOADING", "Regenerating app keys..")
      try {
        const response = await api.generateKeys({
          data,
          sessionToken: state.session.token
        });
        dispatch("STOP_LOADING")
        const { app, message } = response
        commit("updateAppKeys", app)
        commit("notify", {
          message: `New Keys created for ${app.name}. Store the secret somewhere as it will only be shown once.`,
          type: "success",
          timeout: 25000
        });
        return app
      } catch (error) {
        dispatch("STOP_LOADING")
        processError(error, {dispatch})
        commit("notify", {
          message: "Failed to generate keys",
          type: "error",
        });
        return false
      }
    },
    DELETE_APP: async ({ commit, state, dispatch }, appId) => {
      dispatch("START_LOADING", "Deleting app..")
      try {
        const response = await api.deleteApp({
        data: {
          app_id: appId
        },
          sessionToken: state.session.token
        });
        dispatch("STOP_LOADING")
        console.log({response})
        commit('deleteApp', appId);
      } catch (error) {
        dispatch("STOP_LOADING")
        let errorMessage = processError(error, {dispatch})
        commit("notify", {
          message: errorMessage || "Unknown Error",
          type: "error",
        });
        return false
      }
    },
    LOGOUT: async ({ state, dispatch }) => {
      dispatch("START_LOADING", "Logging out..")
      try {
        await api.endAuthSession(state.session.token);
        dispatch("RESET_ACCOUNT_MODULE")
        dispatch("STOP_LOADING")
          type: 'success',
          message: 'Logged out',
          timeout: 3000
        })
        return true;
      } catch (error) {
        console.log(error)
        dispatch("RESET_ACCOUNT_MODULE")
        dispatch("STOP_LOADING")
        return true;
      }
    },
    RESET_ACCOUNT_MODULE: ({commit}) => {
      commit("updateUser", null);
      commit("updateSession", null)
      commit("updateApps", null)
    }
  },
}

export const store = createStore({
  state: {
    notification: null,
    loading: null,
    tempData: {}
  },
  getters: {
    getLoading: state => state.loading,
    getNotification: state => state.notification,
    getTempData: state => state.tempData
  },
  mutations: {
    notify(state, {show, message, type}){
      state.notification = {
        show: show || true,
        message,
        type: type || "info",
      }
    },
    clearNotification(state){
      state.notification = null
    },
    updateTempData(state, data){
      state.tempData = data
    },
    updateLoading(state, data){
      state.loading = data
    }
  },
  actions: {
    CLEAR_NOTIFICATION({commit}){
      commit('clearNotification')
    },
    START_LOADING({commit}, message){
      commit('updateLoading', {show: true, message})
    },
    STOP_LOADING({commit}){
      commit('updateLoading', {show: false})
    },
    SAVE_TEMP_DATA({commit}, data){
      commit('updateTempData', data)
      return true;
    }
  },
  modules: {
    account
  },
  plugins: [vuexLocal.plugin]
})