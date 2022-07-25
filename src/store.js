import { FetchError } from "ohmyfetch";
import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";
import { api } from "./api";
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
    },
    addNewApp(state, app){
      if(!state.apps) state.apps = []
      state.apps.push(app)
    },
    deleteApp(state, appId){
      state.apps = state.apps.filter(app => app.id !== appId)
    },
    updateApp(state, app){
      const appIndex = state.apps.findIndex(item => item.id === app.id)
      state.apps[appIndex] = app
    },
    updateAppKeys(state, {id, client}){
      const index = state.apps.findIndex(app => app.id === id)
      state.apps[index].client = client
    }
  },
  actions: {
    CREATE_ACCOUNT: async ({ commit, dispatch }, data) => {
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
        commit('updateUser', user);
        commit('updateApps', apps);
        commit('notify', {
          type: 'success',
          message: 'Logged in',
          timeout: 10000
        })
        dispatch("STOP_LOADING")
        return true
      } catch(error){
        let errorMessage = processError(error, {dispatch})
        dispatch("STOP_LOADING")
        commit('notify', {
          type: 'error',
          message: errorMessage,
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
        let tempApp = {...app}
        delete app.secret
        commit('addNewApp', app);
        return tempApp
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
        return null
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
      } catch (error) {
        dispatch("RESET_ACCOUNT_MODULE")
        dispatch("STOP_LOADING")
      }
      return true
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
    tempData: {},
    darkMode: false
  },
  getters: {
    getLoading: state => state.loading,
    getNotification: state => state.notification,
    getTempData: state => state.tempData,
    getDarkMode: state => state.darkMode
  },
  mutations: {
    notify(state, {show, message, type, timeout}){
      state.notification = {
        show: show || true,
        message,
        type: type || "info",
        timeout: timeout || 5000
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
    },
    TOGGLE_DARK_MODE({state}){
      console.log("Here 2")
      state.darkMode = !state.darkMode
    }
  },
  modules: {
    account
  },
  plugins: [vuexLocal.plugin]
})