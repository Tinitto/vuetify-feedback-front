<template>
  <div>
    <app-banner 
      :rating="application.rating"
      :application-description="application.description"
      :application-name="application.name"
      :action-url="feedbackFormLink"
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

import { FEEDBACK_FORM_URL, DEFAULT_BACKEND_URL } from "../assets/config.js";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  data: () => ({
    /*application: {},
    ratings: {},*/
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
    feedbackFormLink() {
      let backendUrl = this.$route.query.backendUrl || DEFAULT_BACKEND_URL;
      let feedbackFormUrl =
        this.$route.query.feedbackFormUrl || FEEDBACK_FORM_URL;
      let encodedBackendUrl = encodeURIComponent(backendUrl);
      let redirectUrl = encodeURIComponent(window.location.href);
      return `${feedbackFormUrl}/?backendUrl=${encodedBackendUrl}&applicationId=${
        this.$route.params.id
      }&redirectUrl=${redirectUrl}`;
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
