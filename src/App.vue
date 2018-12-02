<template>
  <v-app>
    <tool-bar />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import ToolBar from './components/ToolBar';
import { DEFAULT_BACKEND_URL } from './assets/config';

export default {
  name: 'App',
  components: {
    ToolBar
  },
  data () {
    return {
      //
    }
  },
    async created() {
    let store = this.$store;
    this.$store.subscribe(mutation => {
      if (mutation.type === "updateBackendUrl") {
        store.dispatch("auth/authenticate").catch(error => {
          console.log(error);
          window.location.assign(`${store.state.backendUrl}/auth/google`);
        });
      }
    });
    if (this.$route.query.backendUrl) {
      // update the store to be based on a different socketServerUrl
      await this.$store.dispatch(
        "UPDATE_BACKEND_URL",
        this.$route.query.backendUrl
      );
    } else {
      const backendUrl =
        this.$store.state.backendUrl || DEFAULT_BACKEND_URL;
      await this.$store.dispatch("UPDATE_BACKEND_URL", backendUrl);
    }
  }
};
</script>
