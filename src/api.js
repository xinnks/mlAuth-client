import mlAuth from "./mlAuth"
import { Vars } from "./config";

export const api = {
  sdk: null,

  provider: () => {
    if (api.sdk) return api.sdk;
    let client = new mlAuth({
      key: Vars.client,
      secret: Vars.secret
    })
    api.sdk = client;
    return client;
  },

  createAccount: (data) => {
    return api.provider().createApp(data);
  },

  verifyAccount: (token) => {
    return api.provider().verifyAccount(token);
  },

  createApp: (data, token) => {
    return api.provider().createApp(data);
  },

  updateApp: (data) => {
    return api.provider().updateApp(data);
  },

  generateKeys: (data, token) => {
    return api.provider().generateKeys(data, token);
  },

  deleteApp: (data, token) => {
    return api.provider().deleteApp(data, token);
  },

  createLoginRequest: (email) => {
    return api.provider().login(email);
  },

  createAuthSession: (token) => {
    return api.provider().verify(token)
  },

  endAuthSession: (token) => {
    return api.provider().logout(token);
  },
};