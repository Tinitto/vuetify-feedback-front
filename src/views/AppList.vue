<template>
  <v-container grid-list-sm>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 lg3 v-for="application in $store.state.applications.keyedById" :key="application._id">
        <app-rating-card
          :detail-url="applicationDetailUrl(application._id)"
          :rating="application.rating"
          :application-description="application.description"
          :application-name="application.name"
          :action-url="feedbackFormLink(application._id)"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AppRatingCard from "../components/AppRatingCard.vue";
import { FEEDBACK_FORM_URL, DEFAULT_BACKEND_URL } from "../assets/config.js";
import authErrorHandler from "../assets/authErrorHandler.js";
import { mapActions, mapMutations } from "vuex";

export default {
  created() {
    // initialize the application list
    this.updateApplicationList().catch(err => {
      authErrorHandler(err, this.authenticate, () => {
        this.clearAuthenticateError();
        this.updateApplicationList();
      });
    });
  },
  components: {
    AppRatingCard
  },
  computed: {
    routeQuery() {
      let query = {};
      if (this.$route.query.backendUrl) {
        query.backendUrl = this.$route.query.backendUrl;
      }
      if (this.$route.query.feedbackFormUrl) {
        query.feedbackFormUrl = this.$route.query.feedbackFormUrl;
      }
      return query;
    },
    feedbackFormLinkPrefix() {
      let backendUrl = this.$route.query.backendUrl || DEFAULT_BACKEND_URL;
      let feedbackFormUrl =
        this.$route.query.feedbackFormUrl || FEEDBACK_FORM_URL;
      let encodedBackendUrl = encodeURIComponent(backendUrl);
      return `${feedbackFormUrl}/?backendUrl=${encodedBackendUrl}`;
    }
  },
  methods: {
    ...mapActions("auth", {
      authenticate: "authenticate"
    }),
    ...mapActions("applications", {
      updateApplicationList: "find"
    }),
    feedbackFormLink(applicationId) {
      let redirectUrl = encodeURIComponent(window.location.href);
      return `${
        this.feedbackFormLinkPrefix
      }&applicationId=${applicationId}&redirectUrl=${redirectUrl}`;
    },
    applicationDetailUrl(applicationId) {
      let routeObject = this.$router.resolve({
        name: "app-detail",
        params: { id: applicationId },
        query: this.routeQuery
      });
      return routeObject.href;
    },
    ...mapMutations("auth", {
      clearAuthenticateError: "clearAuthenticateError"
    })
  }
};
</script>
