<template>
  <v-app>
    <tool-bar :viewWidth="windowWidth" :user="currentUser" :logoutFunction="logout" :loginFunction="login" v-if="!$store.state.formVisible"/>

    <v-content>
      <!-- Alert -->
      <container-wrapper v-if="$store.state.message.status && !$store.state.formVisible">
        <v-alert
          v-model="$store.state.message.status"
          dismissible
          :type="$store.state.message.type"
        >{{ $store.state.message.text }}</v-alert>
      </container-wrapper>

      <logged-out-view v-if="!currentUser" :login="login"></logged-out-view>
      <router-view v-else/>
    </v-content>

    <loading v-model="$store.state.loading"></loading>

    <!--<bottom-nav :user="currentUser" class="hidden-md-and-up"></bottom-nav>-->
    <app-footer :viewWidth="windowWidth" :user="currentUser" :links="footerLinks" v-if="!$store.state.formVisible">Company</app-footer>
  </v-app>
</template>

<script>
import ToolBar from "./components/ToolBar";
import ContainerWrapper from "./components/ContainerWrapper";
import AppFooter from "./components/AppFooter";
import LoggedOutView from "./components/LoggedOutView";
import Loading from "./components/Loading";

import { DEFAULT_BACKEND_URL } from "./assets/config";
import { mapMutations, mapActions } from "vuex";

export default {
  name: "App",
  components: {
    ToolBar,
    AppFooter,
    LoggedOutView,
    ContainerWrapper,
    Loading
  },
  data() {
    return {
      backendUrl: "",
      redirectUrl: "",
      token: "",
      windowWidth: 0,
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
    window.addEventListener("resize", this.handleWindowResize);
    this.handleWindowResize();
    const urlParams = new URLSearchParams(window.location.search);
    this.token = urlParams.get("token");
    this.backendUrl = urlParams.get("backendUrl");
    this.redirectUrl = urlParams.get("redirectUrl");

    if (this.redirectUrl || !this.token) {
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
  destroyed() {
    window.removeEventListener("resize", this.handleWindowResize);
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
    handleWindowResize() {
      this.windowWidth = window.innerWidth;
    },
    login() {
      this.authenticate().catch(() => {
        this.logout();
        window.location.assign(this.googleAuthLink);
      });
    },
    dismissError() {
      this.clearAuthenticateError();
    },
    ...mapMutations(["alertError", "alertSuccess"]),
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
          const currentRouteName = this.$route.name;
          // eslint-disable-next-line no-unused-vars
          let { token, ...restQuery } = this.$route.query;
          restQuery.backendUrl = this.backendUrl;
          this.alertSuccess(
            `Logged in successfully as ${this.currentUser.name}`
          );
          this.$router.replace({ name: currentRouteName, query: restQuery });
        })
        // Just use the returned error instead of mapping it from the store.
        .catch(error => {
          // Convert the error to a plain object and add a message.
          let type = error.className;
          error = Object.assign({}, error);
          error.message =
            type === "not-authenticated"
              ? "Login failed. Not allowed."
              : "An error prevented login.";
          this.alertError(error.message);
        });
    },
    ...mapMutations("auth", {
      clearAuthenticateError: "clearAuthenticateError"
    }),
    ...mapActions("auth", ["authenticate", "logout"])
  }
};
</script>
