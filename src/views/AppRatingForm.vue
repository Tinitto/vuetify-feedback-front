<template>
<div>
  <feedback-form
  :title="feedbackTitle"
  :intro="feedbackIntro"
  :user-details="userDetails"
  :application-details="applicationDetails"
  :login-function="authenticate"
  :logout-function="logout"
  v-model="ratingsObject"
  />
  <div v-if="isDevelopment">
    <h6>Ratings Object</h6>
    {{ ratingsObject }}
  </div>
</div>
</template>

<script>
import FeedbackForm from "../components/FeedbackForm";
import authErrorHandler from "../assets/authErrorHandler.js";

import { mapMutations, mapActions, mapGetters } from "vuex";

export default {
  components: {
    FeedbackForm
  },
  data: () => ({
    ratingsObject: {},
    error: undefined
  }),
  created() {
    this.updateApplication(this.applicationId).catch(err => {
      authErrorHandler(err, this.authenticate, () => {
        this.clearAuthenticateError();
        this.updateApplication(this.applicationId);
      });
    });
  },
  computed: {
    isDevelopment() {
      return window.webpackHotUpdate;
    },
    userDetails() {
      let user = this.$store.state.auth.user || {};
      user.accessToken = this.$store.state.auth.accessToken;
      return user;
    },
    ...mapGetters("applications", {
      findApplicationById: "get"
    }),
    applicationId() {
      return this.$route.params.id;
    },
    application() {
      return this.findApplicationById(this.applicationId);
    },
    applicationDetails() {
      let application = { ...this.application };
      application.id = application._id;
      application.actionUrl = this.$store.state.backendUrl || "";
      application.actionUrl = `${application.actionUrl}/ratings`;
      application.redirectUrl = this.$route.query.formRedirectUrl || "/";
      return application;
    },
    feedbackTitle() {
      return `Rate ${this.application.name}`;
    },
    feedbackIntro() {
      return `Please take a few seconds to rate ${this.applicationame}`;
    }
  },
  methods: {
    dismissError() {
      this.error = undefined;
      this.clearAuthenticateError();
    },
    ...mapActions("applications", {
      updateApplication: "get"
    }),
    ...mapMutations("auth", {
      clearAuthenticateError: "clearAuthenticateError"
    }),
    ...mapActions("auth", ["authenticate", "logout"])
  }
};
</script>
