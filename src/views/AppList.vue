<template>
  <v-container grid-list-sm mb-5>
    <v-layout row wrap>
      <v-flex
        xs12
        sm6
        md4
        lg3
        v-for="application in $store.state.applications.keyedById"
        :key="application._id"        
      >
        <app-rating-card
          :detail-url="applicationDetailUrl(application._id)"
          :rating="application.rating"
          :application-description="application.description"
          :application-name="application.name"
        />
      </v-flex>
      <app-form v-if="isAppOwner || isAdmin" :submit-function="createNewApplication">
      </app-form>
    </v-layout>
  </v-container>
</template>

<script>
import AppRatingCard from "../components/AppRatingCard.vue";
import AppForm from "../components/AppForm.vue";
import authErrorHandler from "../assets/authErrorHandler.js";
import { mapActions, mapMutations } from "vuex";

export default {
  data: () => ({
    message: {
      type: undefined, // enum ['success', 'info', 'warning', 'error']
      text: undefined,
      status: false
    }
  }),
  created() {
    // initialize the application list
    const params = {};
    this.updateApplicationList(params).catch(err => {
      authErrorHandler(err, this.authenticate, () => {
        this.clearAuthenticateError();
        this.updateApplicationList(params);
      });
    });
  },
  components: {
    AppRatingCard,
    AppForm
  },
  computed: {
    isAppOwner() {
      const currentUser = this.$store.state.auth.user;
      return currentUser ? currentUser.isOwner : false;
    },
    isAdmin() {
      const currentUser = this.$store.state.auth.user;
      return currentUser ? currentUser.isAdmin : false;
    },
    routeQuery() {
      let query = {};
      if (this.$route.query.backendUrl) {
        query.backendUrl = this.$route.query.backendUrl;
      }
      return query;
    }
  },
  methods: {
    ...mapActions("auth", {
      authenticate: "authenticate"
    }),
    ...mapActions("applications", {
      createApplication: "create"
    }),
    ...mapActions("applications", {
      updateApplicationList: "find"
    }),
    ...mapMutations(["alertError", "alertSuccess"]),
    createNewApplication(data) {
      this.createApplication(data)
        .then(response => {
          this.alertSuccess(`${response.name} created successfully`);
        })
        .catch(err => {
          this.alertError(err.message);
        });
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
