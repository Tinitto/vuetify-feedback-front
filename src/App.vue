<template>
  <v-app>
    <tool-bar :user="currentUser" :logoutFunction="logout" :loginFunction="login"/>

    <v-content>
      <!-- Alert -->
      <container-wrapper v-if="$store.state.message.status">
        <v-alert
          v-model="$store.state.message.status"
          dismissible
          :type="$store.state.message.type"
        >
        {{ $store.state.message.text }}
        </v-alert>
      </container-wrapper>

      <logged-out-view v-if="!currentUser" :login="login"></logged-out-view>
      <router-view v-else/>
    </v-content>

    <app-footer :links="footerLinks">Company</app-footer>
  </v-app>
</template>

<script>
import ToolBar from "./components/ToolBar";
import ContainerWrapper from "./components/ContainerWrapper";
import AppFooter from "./components/AppFooter";
import LoggedOutView from "./components/LoggedOutView";
import { DEFAULT_BACKEND_URL } from "./assets/config";
import { mapMutations, mapActions } from "vuex";

export default {
  name: "App",
  components: {
    ToolBar,
    AppFooter,
    LoggedOutView,
    ContainerWrapper
  },
  data() {
    return {
      error: undefined,
      backendUrl: "",
      redirectUrl: "",
      token: "",
      footerLinks: [
        {
          label: "home",
          href: "#"
        },
        {
          label: "docs"
        },
        {
          label: "team"
        }
      ]
    };
  },
  async created() {
    const urlParams = new URLSearchParams(window.location.search);
    this.token = urlParams.get("token");
    this.backendUrl = urlParams.get("backendUrl");
    console.log(this.backendUrl);
    this.redirectUrl = urlParams.get("redirectUrl");

    if (this.redirectUrl) {
      await this.$store.dispatch("UPDATE_REDIRECT_URL", this.redirectUrl);
    }

    if (this.backendUrl) {
      // update the store to be based on a different socketServerUrl
      await this.$store.dispatch("UPDATE_BACKEND_URL", this.backendUrl);
    } else {
      const backendUrl = this.$store.state.backendUrl || DEFAULT_BACKEND_URL;
      await this.$store.dispatch("UPDATE_BACKEND_URL", backendUrl);
    }
    if (!this.token) {
      this.login();
    }
    // await this.attemptExternalLogin();
    await this.attemptInternalLogin();
    const localAttemptExternalLogin = this.attemptExternalLogin;
    this.$store.subscribe(mutation => {
      if (mutation.type === "updateBackendUrl") {
        localAttemptExternalLogin();
      }
    });
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    googleAuthLink() {
      return `${this.$store.state.backendUrl}/auth/google`;
    }
  },
  methods: {
    login() {
      this.authenticate().catch(() => {
        this.logout();
        window.location.assign(this.googleAuthLink);
      });
    },
    dismissError() {
      this.error = undefined;
      this.clearAuthenticateError();
    },
    async attemptExternalLogin() {
      if (
        (!this.$store.state.auth.accessToken ||
          !this.$store.state.auth.user ||
          this.$store.state.auth.accessToken) &&
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
          restQuery.backendUrl = this.backendUrl;
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
    }),
    ...mapActions("auth", ["authenticate", "logout"])
  }
};
</script>
