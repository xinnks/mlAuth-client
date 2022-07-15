import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";
import { api } from "./api";
import { Vars } from "./config";
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
  
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
    }
  },
  actions: {
    CREATE_ACCOUNT: async ({ commit }, data) => {
      try {
        const response = await api.createAccount(data)
        commit("notify", {
          show: true,
          message: 'Open the link we\'ve sent to your email to verify account',
          type: "success",
        });
      } catch (error) {
        commit("notify", {
          show: true,
          message: error.message,
          type: "error",
        });
      }
    },
    VERIFY_APP: async ({ commit, state }, token) => {
      try {
        await api.verifyAccount(token);
        commit("notify", {
          message: "Account Verified. Proceed to logging in.",
          type: "success",
        });
        return true;
      } catch (error) {
        commit("notify", {
          message: "Failed to verify account. Please reload the page.",
          type: "error",
        });
        return false;
      }
    },
    LOGIN: async ({ commit, dispatch }, email) => {
      try{
        let request = await api.createLoginRequest(email)
        commit('notify', {show: true, type: 'success', message: 'Open the link in your email to login.', timeout: 10000})
        return true
      } catch(error){
        console.log(error)
        commit('notify', {type: 'error', message: 'Failed to login', timeout: 10000})
        return false
      }
    },
    AUTHENTICATE: async ({ commit, dispatch }, token) => {
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
        return true
      } catch(error){
        console.log(error)
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
        console.log(error)
        commit("notify", {
          show: true,
          message: "Failed to generate keys",
          type: "error",
        });
      }
    },
    LOGOUT: async ({ commit, state }) => {
      try {
        let loggedOut = await api.endAuthSession(state.session.token);
        commit("updateUser", null);
        commit("updateSession", null)
        commit('notify', {
          type: 'success',
          message: 'Logged out',
          timeout: 3000
        })
        return true;
      } catch (error) {
        console.log(error)
        commit("updateUser", null);
        commit("updateSession", null)
        return true;
      }
    },
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
    LOADING({commit}, data = null){
      commit('updateLoading', data)
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