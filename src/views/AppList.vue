<template>
  <div
    id="e3"
    style="max-width: 80vw; margin: auto;"
    class="grey lighten-3"
  >
    <v-card color="grey lighten-3">
      <v-container
        fluid
        grid-list-lg
      >
        <v-layout row wrap>
          <v-flex xs12 v-for="application in applicationList" :key="application._id">
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
    </v-card>
  </div>
</template>

<script>
import AppRatingCard from '../components/AppRatingCard.vue';
import { FEEDBACK_FORM_URL, DEFAULT_BACKEND_URL } from '../assets/config.js';
import ApplicationList from '../assets/factoryApplicationList.js';
export default {
  data: () => ({
    applicationList: {}
  }),
  created(){
    // initialize the application list
    this.updateApplicationList();
  },
  components: {
    AppRatingCard
  },
  computed: {
    routeQuery(){
      let query = {};
      if(this.$route.query.backendUrl){
        query.backendUrl = this.$route.query.backendUrl;
      }
      if(this.$route.query.feedbackFormUrl){
        query.feedbackFormUrl = this.$route.query.feedbackFormUrl;
      }
      return query;
    },
    feedbackFormLinkPrefix(){
      let backendUrl = this.$route.query.backendUrl || DEFAULT_BACKEND_URL;
      let feedbackFormUrl = this.$route.query.feedbackFormUrl || FEEDBACK_FORM_URL;
      let encodedBackendUrl = encodeURIComponent(backendUrl);
      return `${feedbackFormUrl}/?backendUrl=${encodedBackendUrl}`;
    }
  },
  methods: {
    updateApplicationList(){
      // goes to the backend to retrieve application list
      this.applicationList = ApplicationList;
    },
    feedbackFormLink(applicationId){
      return `${this.feedbackFormLinkPrefix}&applicationId=${applicationId}`
    },
    applicationDetailUrl(applicationId){
      let routeObject = this.$router.resolve({
        name: 'app-detail',
        params: {id: applicationId },
        query: this.routeQuery,
      });
      return routeObject.href;
    }
  }
}
</script>
