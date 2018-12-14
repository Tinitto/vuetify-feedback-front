import Vue from "vue";
import "./plugins/vuetify";
import "./plugins/vue-moment";
import App from "./App.vue";
import router from "./router";
import storeGenerator from "./store-generator";
import { DEFAULT_BACKEND_URL } from "./assets/config";

Vue.config.productionTip = false;

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  // eslint-disable-next-line
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const socketBackendUrl =
  getParameterByName("backendUrl") || DEFAULT_BACKEND_URL;
let store = storeGenerator(socketBackendUrl);
const originalBackendUrl = store.state.backendUrl;
if (!socketBackendUrl && originalBackendUrl) {
  // the state always keeps the original backend since it is persisted in localStorage
  store = storeGenerator(originalBackendUrl);
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
