import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import feathersVuex from "feathers-vuex";
import { makeFeathersClient } from "./feathers-client";
import { DEFAULT_BACKEND_URL, VUEX_LOCAL_STORAGE_KEY } from './assets/config';

Vue.use(Vuex);

const storeGenerator = function(socketServerUrl) {
  /*
  * This returns a vuex store that can be updated on the Vue instance like
  * this.$store = storeGenerator(someBackendUrl); // as called in a component
  */

  socketServerUrl =
    socketServerUrl || DEFAULT_BACKEND_URL;

  // Persisting the state to the localStorage
  const VuexLocal = new VuexPersist({
    key: VUEX_LOCAL_STORAGE_KEY,
    storage: window.localStorage
  });

  // Adding Feathers into Vuex
  // this makeFeathersClient needs to depend on the store.state,backendUrl
  const feathersClient = makeFeathersClient(socketServerUrl);
  const { service, auth } = feathersVuex(feathersClient, { idField: "_id" });

  return new Vuex.Store({
    state: {
      backendUrl: socketServerUrl,
      applicationId: "",
      applicationName: ""
    },
    mutations: {
      updateBackendUrl(state, payload) {
        state.backendUrl = payload;
      },
      refreshStateOnBackendChange(state) {
        //mutation to initialise the store especially on startup
        let backendUrl = state.backendUrl;
        let newState = storeGenerator(backendUrl).state;
        this.replaceState(Object.assign(state, newState));
      }
    },
    actions: {
      UPDATE_BACKEND_URL(store, payload) {
        store.commit("updateBackendUrl", payload);
      },
      REFRESH_STATE_ON_BACKEND_CHANGE(store) {
        store.commit("refreshStateOnBackendChange");
      }
    },
    plugins: [
      // add ratings service
      service("ratings"),
      // add users service
      service("users"),
      // add applications service
      service("applications"),
      // add authentication
      auth({
        userService: "users"
      }),
      VuexLocal.plugin // Put this last to be able to persist all state
    ]
  });
};

export default storeGenerator;
