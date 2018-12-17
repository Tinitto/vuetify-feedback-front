<template>
  <div color="grey lighten-4" >
    <app-banner 
      :rating="application.rating"
      :application-description="application.description"
      :application-name="application.name"
      :action-url="betterFeedbackFormLink"
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
    ...mapActions("ratings", {
      updateRatings: "find"
    }),
    ...mapActions("auth", {
      authenticate: "authenticate"
    }),
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
