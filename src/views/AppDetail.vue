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
import _ from 'lodash';
import AppBanner from "../components/AppBanner.vue";
import RatingList from '../components/RatingList.vue';

import { FEEDBACK_FORM_URL, DEFAULT_BACKEND_URL } from '../assets/config.js';
import ApplicationRatings from '../assets/factoryRatingsList.js';
import ApplicationList from '../assets/factoryApplicationList.js';

export default {
  data: () => ({
    application: {},
    ratings: {},
  }),
  components: {
    AppBanner,
    RatingList
  },
  created(){
    this.updateApplication();
    this.updateRatings();
  },
  computed: {
    feedbackFormLink(){
      let backendUrl = this.$route.query.backendUrl || DEFAULT_BACKEND_URL;
      let feedbackFormUrl = this.$route.query.feedbackFormUrl || FEEDBACK_FORM_URL;
      let encodedBackendUrl = encodeURIComponent(backendUrl);
      return `${feedbackFormUrl}/?backendUrl=${encodedBackendUrl}&applicationId=${this.$route.params.id}`
    }
  },
  methods: {
    updateApplication(){
      // Call the backend server to get the current this application basing on this.$route.params.id      
      this.application = ApplicationList[this.$route.params.id];
    },
    updateRatings(){
      // Get the ratings of this application
      let applicationId = this.$route.params.id;
      let ratingsIdsForApp = Object.keys(ApplicationRatings).filter(
        ratingId => (ApplicationRatings[ratingId].applicationId == applicationId));
      this.ratings = _.pick(ApplicationRatings, ...ratingsIdsForApp);
    },
  }
};
</script>

