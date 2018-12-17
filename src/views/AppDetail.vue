<template>
  <div color="grey lighten-4" >
    <app-banner 
      :rating="application.rating"
      :application-description="application.description"
      :application-name="application.name"
      :action-url="betterFeedbackFormLink"
      :delete-function="deleteFunction"
      style="z-index: 1;"
    />
    <rating-list 
     :ratings="ratings"
    />

  </div>
</template>

<script>
import AppBanner from "../components/AppBanner.vue";
import RatingList from "../components/RatingList.vue";
import authErrorHandler from "../assets/authErrorHandler.js";

import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  data: () => ({
    error: undefined
  }),
  components: {
    AppBanner,
    RatingList
  },
  created() {
    this.updateApplication(this.applicationId).catch(err => {
      authErrorHandler(err, this.authenticate, () => {
        this.clearAuthenticateError();
        this.updateApplication(this.applicationId);
      });
    });
    const ratingsQuery = {
      query: {
        application: this.applicationId,
        $sort: { createdAt: -1 }
      }
    };
    this.updateRatings(ratingsQuery).catch(err => {
      authErrorHandler(err, this.authenticate, () => {
        this.clearAuthenticateError();
        this.updateRatings(ratingsQuery);
      });
    });
  },
  computed: {
    isAppOwnerOrAdmin() {
      const currentUser = this.$store.state.auth.user;
      return currentUser ? currentUser.isOwner || currentUser.isAdmin : false;
    },
    deleteFunction() {
      if (this.isAppOwnerOrAdmin) {
        return this.deleteAppAndRedirect;
      }
      return undefined;
    },
    betterFeedbackFormLink() {
      const redirectUrl =
        this.$store.state.redirectUrl || this.$router.currentRoute.fullPath;
      console.log(redirectUrl);
      const query = {
        backendUrl: this.$store.state.backendUrl,
        formRedirectUrl: redirectUrl
      };
      const params = {
        id: this.applicationId
      };
      // console.log(this.$router.resolve({ name: "app-rating-form", params, query }));
      return this.$router.resolve({ name: "app-rating-form", params, query })
        .href;
    },
    ...mapGetters("ratings", {
      findRatingsInStore: "find"
    }),
    ...mapGetters("applications", {
      findApplicationById: "get"
    }),
    applicationId() {
      return this.$route.params.id;
    },
    application() {
      return this.findApplicationById(this.applicationId);
    },
    ratingsArray() {
      const query = {
        application: this.applicationId,
        $sort: { createdAt: -1 }
      };
      return this.findRatingsInStore({ query }).data || [];
    },
    ratings() {
      return this.arrayToObject(this.ratingsArray, "_id");
    }
  },
  methods: {
    ...mapActions("applications", {
      updateApplication: "get"
    }),
    ...mapActions("applications", {
      deleteApplication: "remove"
    }),
    ...mapActions("ratings", {
      updateRatings: "find"
    }),
    ...mapMutations(["alertError", "alertSuccess"]),
    ...mapActions("auth", {
      authenticate: "authenticate"
    }),
    deleteAppAndRedirect() {
      if (!this.isAppOwnerOrAdmin) {
        this.alertError("You don't have enough privileges to do this");
        return;
      }
      this.deleteApplication(this.applicationId)
        .then(response => {
          const query = this.$router.currentRoute.query;
          this.alertSuccess(`${response.name} deleted sucessfully`);
          this.$router.push({ name: "app-list", query });
        })
        .catch(err => {
          this.alertError(err.message);
        });
    },
    arrayToObject(array, keyField) {
      console.log(Array.isArray(array));
      let obj = {};
      array.forEach(value => {
        obj[value[keyField]] = value;
      });
      return obj;
    },
    ...mapMutations("auth", {
      clearAuthenticateError: "clearAuthenticateError"
    })
  }
};
</script>
