<template>
  <v-app>
    <tool-bar
    :user="$store.state.auth.user"
    />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import ToolBar from "./components/ToolBar";
import { DEFAULT_BACKEND_URL } from "./assets/config";
import { mapMutations } from "vuex";

export default {
  name: "App",
  components: {
    ToolBar
  },
  data() {
    return {
      error: undefined,
      backendUrl: "",
      token: ""
    };
  },
  async created() {
    const urlParams = new URLSearchParams(window.location.search);
    this.token = urlParams.get("token");
    this.backendUrl = urlParams.get("backendUrl");

    if (this.backendUrl) {
      // update the store to be based on a different socketServerUrl
      await this.$store.dispatch("UPDATE_BACKEND_URL", this.backendUrl);
    } else {
      const backendUrl = this.$store.state.backendUrl || DEFAULT_BACKEND_URL;
      await this.$store.dispatch("UPDATE_BACKEND_URL", backendUrl);
    }
    await this.attemptExternalLogin();
    await this.attemptInternalLogin();
    const localAttemptExternalLogin = this.attemptExternalLogin;
    this.$store.subscribe(mutation => {
      if (mutation.type === "updateBackendUrl") {
        localAttemptExternalLogin();
      }
    });
  },
  computed: {
    googleAuthLink() {
      return `${this.$store.state.backendUrl}/auth/google`;
    }
  },
  methods: {
    dismissError() {
      this.error = undefined;
      this.clearAuthenticateError();
    },
    async attemptExternalLogin() {
      if (
        (!this.$store.state.auth.accessToken || !this.$store.state.auth.user) &&
        !this.token
      ) {
        let googleAuthLink = this.googleAuthLink;
        await this.$store.dispatch("auth/authenticate").catch(() => {
          // redirect to Google login
          window.location.assign(googleAuthLink);
        });
      }
    },
    async attemptInternalLogin(event) {
      if (!this.token) return; // if there is no token, return without doing anything
      if (event) event.preventDefault();
      this.dismissError();
      // Native form submission is not yet supported
      await this.$store
        .dispatch("auth/authenticate", {
          strategy: "jwt",
          accessToken: this.token
        })
        .then(() => {
          console.log("successful login");
          const currentRouteName = this.$route.name;
          // eslint-disable-next-line no-unused-vars
          let { token, ...restQuery } = this.$route.query;
          this.$router.replace({ name: currentRouteName, query: restQuery });
        })
        // Just use the returned error instead of mapping it from the store.
        .catch(error => {
          console.log(error);
          // Convert the error to a plain object and add a message.
          let type = error.className;
          error = Object.assign({}, error);
          error.message =
            type === "not-authenticated"
              ? "Login failed. Not allowed."
              : "An error prevented login.";
          this.error = error;
        });
    },
    ...mapMutations("auth", {
      clearAuthenticateError: "clearAuthenticateError"
    })
  }
};
</script>
