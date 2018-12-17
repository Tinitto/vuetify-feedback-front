<template>
  <div color="grey lighten-4" >

    <feedback-form
    v-model="showFeedback"
    :send-feedback="createRatingAndCloseDialog"
    :cancel-function="closeFeedbackForm"
    :title="feedbackTitle"
    :intro="feedbackIntro"
    :application-id="applicationId"  
    v-if="showFeedback"  
    >
    </feedback-form>
    <app-banner 
      :rating="application.rating"
      :application-description="application.description"
      :application-name="application.name"
      :action="showFeedbackForm"
      :delete-function="deleteFunction"
      style="z-index: 1;"
      v-if="!showFeedback"
    />
    <rating-list 
     :ratings="ratings"
     v-if="!showFeedback"
    />


  </div>
</template>

<script>
import AppBanner from "../components/AppBanner.vue";
import RatingList from "../components/RatingList.vue";
import FeedbackForm from '../components/FeedbackForm.vue';
import authErrorHandler from "../assets/authErrorHandler.js";

import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  data: () => ({
    error: undefined,
    showFeedback: false,
  }),
  components: {
    AppBanner,
    RatingList,
    FeedbackForm
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
    feedbackTitle() {
      return `Rate ${this.application.name}`;
    },
    feedbackIntro() {
      return `Please take a few seconds to rate ${this.application.name}`;
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
    ...mapActions("ratings", {
      createRating: "create"
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
      let obj = {};
      array.forEach(value => {
        obj[value[keyField]] = value;
      });
      return obj;
    },
    closeFeedbackForm(){
      this.showFeedback = false;
    },
    showFeedbackForm(){
      this.showFeedback = true;
    },
    createRatingAndCloseDialog(data){
      this.createRating(data)
      .then(response => {
        this.alertSuccess(`You have rated ${this.application.name} successfully.`);        
      }).catch(err => {
        this.alertError(err.message);
      }).finally(() => {
        this.closeFeedbackForm();
        // attempt to update the application's details
        this.updateApplication(this.applicationId)
        .catch(error => {
          this.alertError(error.message);
        });
      });      
    },
    ...mapMutations("auth", {
      clearAuthenticateError: "clearAuthenticateError"
    })
  }
};
</script>
